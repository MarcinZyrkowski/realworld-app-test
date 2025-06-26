import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import playwright from 'eslint-plugin-playwright'

const tsRecommended = tsPlugin.configs.recommended
const playwrightRecommended = playwright.configs.recommended

export default [
  {
    // typescript rules
    files: ['**/*.{ts,tsx,mts,cts}'],
    ignores: ['playwright.config.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsRecommended.rules,
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },
  {
    // playwright rules
    files: ['**/*.{js,mjs,cjs,ts,tsx,mts,cts}'],
    plugins: {
      playwright: playwright,
    },
    rules: {
      ...playwrightRecommended.rules,
      'playwright/expect-expect': 'off',
      'playwright/no-standalone-expect': 'off',
    },
    ignores: ['**/node_modules/**', '**/reports/**', '**/playwright-report/**'],
  },
]
