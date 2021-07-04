module.exports = {
  plugins: ["react"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module", // fix Parsing error: The keyword 'import' is reserved
  },
  env: {
    browser: true,
    node: true, // fix the "module" is not defined and "process" is not defined error.
    es6: true,
  },
  rules: {
    "react/prop-types": 0,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
