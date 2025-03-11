import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

// Combine Vitest globals if needed (assuming you have an appropriate package)
// const vitestGlobals = { ...globals.browser, ...{ 'vitest-globals/env': true} }

export default [
  // Ignored files
  {
    ignores: [
      'dist/',
      'node_modules/',
      'vite.config.js',
    ],
  },
  {
    // Apply to JavaScript and JSX files
    files: ['**/*.{js,jsx}'],
    env: {
      vitest: true,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      }
    },
    settings: {
      react: { version: '18.3' } // Adjust to your React version
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      // Custom rules from your .eslintrc.cjs
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 0,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      // Additional custom rule for react-refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      // Disable target blank warning if desired
      'react/jsx-no-target-blank': 'off',
    },
  },
]
