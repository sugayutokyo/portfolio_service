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
    // 文末のセミコロンを省略
    semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
    'semi-spacing': ['error', { after: true, before: false }],
    'semi-style': ['error', 'first'],
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
