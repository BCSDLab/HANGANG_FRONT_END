module.exports = {
  plugins: ["react"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module", // fix Parsing error: The keyword 'import' is reserved
  },
  env: {
    node: true, // fix the "module" is not defined and "process" is not defined error.
  },
  rules: {
    "react/prop-types": false,
  },
};
