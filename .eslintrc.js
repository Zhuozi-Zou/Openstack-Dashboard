module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "vue/script-indent": ["error", 2, {  // script标签缩进设置
      "baseIndent": 1,
      "switchCase": 0,
      "ignores": []
    }]
  },
  overrides: [
    {
      "files": ["*.vue"],
      "rules": {
        "indent": "off",
      }
    }
  ]
}
