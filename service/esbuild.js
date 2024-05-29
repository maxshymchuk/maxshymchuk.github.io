import { build } from 'esbuild';

await build({
    bundle: true,
    minify: true,
    entryPoints: ['src/index.ts'],
    format: 'esm',
    platform: 'node',
    target: 'esnext',
    outfile: 'dist/service.js',
    banner: {
        js: 'import { createRequire } from \'module\'; const require = createRequire(import.meta.url);'
    }
});