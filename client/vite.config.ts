import { defineConfig } from 'vite';
import eta from './scripts/vite-plugin-eta';
import meta from '../data/meta.json';

export default defineConfig({
    plugins: [eta(meta)],
    css: {
        modules: {
            localsConvention: 'camelCaseOnly',
        },
    },
});
