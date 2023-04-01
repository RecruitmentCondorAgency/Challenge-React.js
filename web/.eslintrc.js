/* eslint-disable no-undef */

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    indent: ['error', 2],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': "error",
    'no-var': 'error',
    'prefer-const': 'error',
    semi: ['error', 'always'],
    'quote-props': ['error', 'as-needed'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
