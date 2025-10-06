/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
    '**/*.ts?(x)': (files) => [
        'tsc -p client/tsconfig.json --noEmit',
        'tsc -p service/tsconfig.json --noEmit',
        `eslint --fix ${files.join(' ')}`,
    ],
    '*': 'prettier --write',
};
