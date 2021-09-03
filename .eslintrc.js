module.exports = {
  env: {
    node: true,
    browser: true, //ブラウザ関連のglobal変数はeslintの対象から除外する
  },
  extends: [
    'eslint:recommended', // defaultのルールを使用
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // セミコロンをつける
    semi: ['error', 'always'],
    'semi-spacing': ['error', { after: true, before: false }],
    'semi-style': ['error', 'last'],
    'no-extra-semi': 'error',
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
