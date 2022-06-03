module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'next/core-web-vitals'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'no-unused-vars': ['error', {
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: false,
    }],
    'comma-spacing': 'off',
    'react/function-component-definition': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'space-before-blocks': 'off',
    'space-in-parens': 'off',
    'object0curly-spacing': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'arrow-body-style': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'indent': [2, 2],
    quotes: [2, 'single', 'avoid-escape'], // exige  '' e não reclama de "quotes 'assim'"
    semi: [2, 'always'], // exige ';'
  },
};
