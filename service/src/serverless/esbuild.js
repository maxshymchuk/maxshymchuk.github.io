import { build } from 'esbuild';

await build({
    bundle: true,
    minify: true,
    entryPoints: ['src/data.ts'],
    format: 'esm',
    platform: 'node',
    target: 'esnext',
    outfile: 'api/data.js',
    banner: {
        js: 'import { createRequire } from \'module\'; const require = createRequire(import.meta.url);'
    }
});