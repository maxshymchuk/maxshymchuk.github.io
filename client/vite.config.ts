import { defineConfig } from 'vite';
import eta from './scripts/vite-plugin-eta';
import meta from '../data/meta.json';
import data from '../data/static-data.json';

export default defineConfig({
    plugins: [eta({ meta, data }, { autoTrim: 'slurp' })],
    css: {
        modules: {
            localsConvention: 'camelCaseOnly',
        },
    },
});
