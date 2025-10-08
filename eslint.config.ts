import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
    { ignores: ['**/*.js', '**/public', '**/node_modules', '**/dist'] },
    { files: ['*.{ts,tsx}'] },
    { languageOptions: { globals: globals.browser } },
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    eslintConfigPrettier,
    {
        rules: {
            '@typescript-eslint/restrict-template-expressions': 'off',
            '@typescript-eslint/require-await': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
        },
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
);
