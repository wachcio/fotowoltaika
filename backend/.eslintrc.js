module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'array-callback-return': 'off',
    'linebreak-style': 'off',
    indent: off,
    quotes: ['error', 'single'],
    'func-names': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-new': 'off',
    'no-plusplus': 'off',
    'no-alert': 'off',
    'no-restricted-globals': 'off',
    'no-param-reassign': 'off',
    'global-require': 'off',
    camelcase: 'off',
    'class-methods-use-this': 'off',
    radix: 'off',
    'no-bitwise': 'off',
    'prefer-destructuring': 'off',
    'import/prefer-default-export': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
  },
};
