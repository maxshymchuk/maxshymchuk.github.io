import { mkdir, readdir, writeFile } from 'fs/promises';
import { build as esbuild } from 'esbuild';
import { dirname, resolve } from 'path';
import { stringify } from './utils';

async function createDirectory(filePath: string) {
    return await mkdir(dirname(filePath), { recursive: true });
}

function log(text: string, path: string, file?: string) {
    const title = file ? `[${file}] ${text}` : text;
    console.log(`${title.padEnd(40)} ${path}`);
}

async function createFunctionConfig(path: string, name: string) {
    await createDirectory(path);
    return await writeFile(
        path,
        stringify({
            runtime: 'nodejs22.x',
            handler: name,
            launcherType: 'Nodejs',
            shouldAddHelpers: true,
        }),
    );
}

async function createConfig(path: string) {
    await createDirectory(path);
    return await writeFile(
        path,
        stringify({
            version: 3,
            routes: [
                {
                    src: '^(?:/(.*))$',
                    headers: {
                        'Access-Control-Allow-Credentials': 'true',
                        'Access-Control-Allow-Origin': 'https://maxshymchuk.github.io',
                        'Access-Control-Allow-Methods': 'GET,PATCH',
                        'Access-Control-Allow-Headers':
                            'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                    continue: true,
                },
                {
                    src: '/',
                    dest: '/data',
                },
            ],
        }),
    );
}

async function transform(from: string, where: string) {
    await esbuild({
        bundle: true,
        minify: true,
        entryPoints: [from],
        format: 'cjs',
        platform: 'node',
        target: 'esnext',
        outdir: where,
    });
}

async function createVercelOutput(sourcePath: string) {
    try {
        const files = await readdir(sourcePath);

        const outputPath = resolve('.vercel/output');
        log('Output path', outputPath);

        const configPath = resolve(outputPath, 'config.json');
        await createConfig(configPath);
        log('Config path', configPath);

        console.log();

        for (const file of files) {
            const clean = file.split('.')[0];

            const functionPath = resolve(outputPath, `functions/${clean}.func`);
            log('Function path', functionPath, file);

            const functionConfigPath = resolve(functionPath, '.vc-config.json');
            await createFunctionConfig(functionConfigPath, `${clean}.js`);
            log('Function config path', functionConfigPath, file);

            const sourceModulePath = resolve(sourcePath, file);
            await transform(sourceModulePath, functionPath);
            log('Source module path', sourceModulePath, file);

            console.log();
        }
    } catch (err) {
        console.error(err);
    }
}

await createVercelOutput(resolve(__dirname, 'functions'));
