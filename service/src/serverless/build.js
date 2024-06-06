import { mkdir, readdir, writeFile } from 'fs/promises';
import { build } from 'esbuild';
import { dirname } from 'path';

export async function createServerlessFunction(path, name) {
    await ensureDirectoryExistence(path);
    return await writeFile(path, JSON.stringify({
        runtime: 'nodejs18.x',
        handler: name,
        launcherType: 'Nodejs',
        shouldAddHelpers: true,
    }, null, '    '));
}

async function transform(from, where) {
    await build({
        bundle: true,
        minify: true,
        entryPoints: [from],
        format: 'esm',
        platform: 'node',
        target: 'esnext',
        outdir: where,
        banner: {
            js: 'import { createRequire } from \'module\'; const require = createRequire(import.meta.url);'
        }
    });
}


async function ensureDirectoryExistence(filePath) {
    await mkdir(dirname(filePath), { recursive: true })
}

async function asd(sourcePath) {
    try {
        const files = await readdir(sourcePath);
        for (const file of files) {
            const clean = file.split('.')[0];
            const funcFolder = `../../../.vercel/output/functions/${clean}.func`;
            await createServerlessFunction(`${funcFolder}/.vc-config.json`, `${clean}.js`);
            await transform(`${sourcePath}/${file}`, `${funcFolder}`);
        }
    } catch (err) {
        console.error(err);
    }
}

await asd('./functions');