module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'next',
    'next/core-web-vitals',
    'prettier',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'simple-import-sort'],
  rules: {
    semi: 1,
    'no-undef': 0,
    'no-redeclare': 'off',
    '@next/next/no-img-element': 0,
    '@typescript-eslint/no-redeclare': ['error'],
    'import/extensions': 0,
    'react-hooks/exhaustive-deps': 0,
    'react/no-danger': 0,
    'import/prefer-default-export': 0,
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
  },
};
