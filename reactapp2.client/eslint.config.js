import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsplugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import pluginQuery from '@tanstack/eslint-plugin-query';
import { globalIgnores } from 'eslint/config';

export default [
    globalIgnores(['dist', '**/routetree.gen.ts']),
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
            globals: globals.browser,
        },
        plugins: {
            '@typescript-eslint': tsplugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            '@tanstack/query': pluginQuery,
        },
        rules: {
            ...reactHooks.configs['recommended-latest'].rules,
            ...pluginQuery.configs['flat/recommended'].rules,
        },
    },
];
