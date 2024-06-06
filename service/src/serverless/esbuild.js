import { build } from 'esbuild';

await build({
    bundle: true,
    minify: true,
    entryPoints: ['src/index.ts'],
    format: 'esm',
    platform: 'node',
    target: 'esnext',
    outfile: 'api/build.js',
});