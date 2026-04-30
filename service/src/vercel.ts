import { mkdir, readdir, writeFile } from 'fs/promises';
import { build as esbuild } from 'esbuild';
import { dirname, resolve } from 'path';
import { stringify } from './utils';

type Context = {
    projectRoot: string;
    functionsRoot: string;
    vercelRoot: string;
};

function highlight(...data: unknown[]) {
    return `\x1b[34m${data.join(' ')}\x1b[0m`;
}

function ok(...data: unknown[]) {
    return () => console.log(`\x1b[32m[OK]\x1b[0m`, ...data);
}

function fail(...data: unknown[]) {
    return () => console.log(`\x1b[31m[FAIL]\x1b[0m`, ...data);
}

function createDirectory(path: string) {
    return mkdir(dirname(path), { recursive: true });
}

function handler(title?: string) {
    return async <T = unknown>(
        callback: () => Promise<T>,
        message?: (data: T) => string,
        error?: (error: unknown) => string,
    ): Promise<{ data: T; status: 'ok'; log: () => void } | { error: unknown; status: 'fail'; log: () => void }> => {
        const args: unknown[] = [];
        if (title) args.push(highlight(title));
        try {
            const data = await callback();
            if (message) args.push(message(data));
            return { data, status: 'ok', log: ok(...args) };
        } catch (err) {
            args.push(error?.(err) ?? err);
            return { error: err, status: 'fail', log: fail(...args) };
        }
    };
}

function createFunctionConfig(path: string, name: string) {
    return handler('Config')(
        async () => {
            await createDirectory(path);
            await writeFile(
                path,
                stringify({
                    runtime: 'nodejs24.x',
                    handler: name,
                    launcherType: 'Nodejs',
                    shouldAddHelpers: true,
                }),
            );
        },
        () => path,
    );
}

function createVercelConfig(path: string) {
    return handler('Vercel config')(
        async () => {
            const config = {
                version: 3,
                routes: [
                    {
                        src: '^(?:/(.*))$',
                        headers: {
                            'Access-Control-Allow-Credentials': 'true',
                            'Access-Control-Allow-Origin': 'https://shymch.uk',
                            'Access-Control-Allow-Methods': 'GET,PATCH',
                            'Access-Control-Allow-Headers':
                                'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                        },
                        continue: true,
                    },
                    {
                        src: '/',
                        dest: '/data',
                        continue: true,
                    },
                    {
                        src: '/refresh',
                        dest: '/refresh',
                        continue: true,
                    },
                ],
            };
            await createDirectory(path);
            await writeFile(path, stringify(config));
            return config;
        },
        () => path,
    );
}

function createFunction(from: string, where: string, name: string) {
    return handler('Function')(
        () =>
            esbuild({
                bundle: true,
                minify: true,
                entryPoints: [from],
                format: 'cjs',
                platform: 'node',
                target: 'esnext',
                outdir: where,
            }),
        () => resolve(where, name),
    );
}

function createVercelFunction(file: string, ctx: Context) {
    const clean = file.split('.')[0];

    const sourcePath = resolve(ctx.functionsRoot, file);
    const functionPath = resolve(ctx.vercelRoot, `functions/${clean}.func`);
    const configPath = resolve(functionPath, '.vc-config.json');

    console.log(highlight(file), sourcePath);

    return handler()(async () => {
        const vercelFunction = await createFunction(sourcePath, functionPath, `${clean}.js`);
        vercelFunction.log();
        if (vercelFunction.status === 'fail') throw vercelFunction.error;

        const vercelFunctionConfig = await createFunctionConfig(configPath, `${clean}.js`);
        vercelFunctionConfig.log();
        if (vercelFunctionConfig.status === 'fail') throw vercelFunctionConfig.error;
    });
}

function getCandidates(path: string) {
    return handler('Candidates')(
        () => readdir(path),
        (files) => files.join(' '),
    );
}

function createVercelOutput(ctx: Context) {
    return handler()(
        async () => {
            console.log(highlight('Project root'), ctx.projectRoot);
            console.log(highlight('Vercel root'), ctx.vercelRoot);
            console.log(highlight('Functions root'), ctx.functionsRoot);

            console.log();

            const candidates = await getCandidates(ctx.functionsRoot);
            candidates.log();
            if (candidates.status === 'fail') throw candidates.error;

            console.log();

            const vercelConfig = await createVercelConfig(resolve(ctx.vercelRoot, 'config.json'));
            vercelConfig.log();
            if (vercelConfig.status === 'fail') throw vercelConfig.error;

            console.log();

            for (const file of candidates.data) {
                const vercelFunction = await createVercelFunction(file, ctx);
                if (vercelFunction.status === 'fail') throw vercelFunction.error;
                console.log();
            }
        },
        () => 'Done',
        (err) => `Ended with error ${String(err)}`,
    );
}

const result = await createVercelOutput({
    projectRoot: resolve(__dirname, '..'),
    functionsRoot: resolve(resolve(__dirname), 'functions'),
    vercelRoot: resolve(resolve(__dirname, '..'), '.vercel/output'),
});

result.log();
