import { FlatCompat } from '@eslint/eslintrc';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
});

export default [
	...compat.extends('next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'),
	prettierConfig,
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				project: './tsconfig.json',
				ecmaVersion: 2021,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			'@typescript-eslint': typescript,
			'unused-imports': unusedImports,
			import: importPlugin,
			prettier: prettier,
			'react-hooks': reactHooks,
		},
		rules: {
			// React Hooks 규칙
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			// 화살표 함수 관련 규칙
			'prefer-arrow-callback': 'error',
			'func-style': ['error', 'expression', { allowArrowFunctions: true }],
			'react/function-component-definition': ['error', { namedComponents: 'arrow-function' }],

			// Import 정리 관련 규칙
			'import/order': [
				'error',
				{
					groups: [['builtin', 'external', 'internal']],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true },
					pathGroups: [
						{
							pattern: 'react*',
							group: 'external',
							position: 'before',
						},
						{
							pattern: 'next/*',
							group: 'external',
							position: 'before',
						},
						{
							pattern: '@/**',
							group: 'internal',
							position: 'after',
						},
						{
							pattern: '(.|..)?/**',
							group: 'internal',
							position: 'after',
						},
					],
					pathGroupsExcludedImportTypes: ['react', 'next'],
				},
			],
			'import/newline-after-import': ['error', { count: 1 }],
			'import/no-unresolved': 'off',
			'import/prefer-default-export': 'off',

			// Unused imports 정리
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],

			// Prettier rules
			'prettier/prettier': ['error'],

			// React 관련 규칙
			'react/react-in-jsx-scope': 'off',
			'react/jsx-uses-react': 'off',
			'react/jsx-filename-extension': [
				'warn',
				{
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
			],
			'react/require-default-props': 'off',
			'react/jsx-props-no-spreading': 'off',
			'react/no-unescaped-entities': 'off',

			// TypeScript 관련 규칙
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-use-before-define': 'off',
			'@typescript-eslint/naming-convention': 'off',

			// 기본 규칙들
			'prefer-const': 'error',
			'no-var': 'error',
			'no-console': 'off',
			eqeqeq: 'error',
			curly: 'error',
			'consistent-return': 'off',
			'prefer-destructuring': 'off',
		},
	},
	{
		ignores: [
			'node_modules/**',
			'.next/**',
			'.vercel/**',
			'dist/**',
			'build/**',
			'coverage/**',
			'*.log',
			'.env*',
			'.DS_Store',
			'*.tsbuildinfo',
			'next-env.d.ts',
			'**/*.config.ts',
			'**/*.config.js',
			'**/*.config.json',
			'**/*.config.mjs',
			'public/firebase-messaging-sw.js',
		],
	},
];
