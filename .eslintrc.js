module.exports = {
  env: {
    jest: true
  },
  extends: ['standard'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    semi: ['error', 'always']
  }
};
