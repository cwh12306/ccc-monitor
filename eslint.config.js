import eslint from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importSort from 'eslint-plugin-simple-import-sort';

import tseslint from 'typescript-eslint';

export default tseslint.config({
    files: ['**/*.{ts,tsx}'],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    rules: {
        'no-console': 'warn',
    },
});
