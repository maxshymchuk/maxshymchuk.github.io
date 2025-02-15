import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import type { Linter } from 'eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { ignores: ['package-lock.json', 'public', 'node_modules', 'dist'] },
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
] satisfies Linter.Config[];
