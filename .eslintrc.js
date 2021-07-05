module.exports = {
  plugins: [
    "import",
    "react",
    "react-hooks",
    "jsx-a11y",
    "prettier",
  ],
  extends: [
    "eslint:recommended",
    'plugin:import/errors',
    "plugin:react/recommended",
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    "prettier",
  ],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module", // fix Parsing error: The keyword 'import' is reserved
  },
  env: {
    browser: true,
    node: true, // fix the "module" is not defined and "process" is not defined error.
    es6: true,
  },
  rules: {
    "react/jsx-filename-extension": [2, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    "react/prop-types": 0,
    "prettier/prettier": "off",
  },
  settings: {
    "import/resolver": {
      "babel-module": {}
    },
    react: {
      version: "detect",
    },
  },
};
