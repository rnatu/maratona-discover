module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'off',
    'no-param-reassign': 'off',
    'prefer-const': 'off',
    'no-use-before-define': 'off',
  },
};
