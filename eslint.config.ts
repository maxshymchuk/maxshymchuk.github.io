import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig(
    globalIgnores(['**/public/**', '**/node_modules/**', '**/dist/**', '**/.vercel/**']),

    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,

    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['eslint.config.ts'],
                },
            },
        },
        rules: {
            '@typescript-eslint/require-await': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/no-misused-promises': 'off',
            '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'separate-type-imports' }],
        },
    },

    prettier,
);
