module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  root: true,
  rules: {
    'no-alert': 0,
    'no-console': 0,
    'import/extensions': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
  },
};
