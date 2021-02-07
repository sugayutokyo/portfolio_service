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
  rules: {},
  settings: {
    react: {
      version: 'detect',
    },
  },
}
