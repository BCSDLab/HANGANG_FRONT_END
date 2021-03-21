const presets = [
  "@babel/preset-react",
  [
    "@babel/preset-env",
    {
      targets: {
        chrome: "40",
      },
      useBuiltIns: "usage",
      corejs: 3,
    },
  ],
];

const plugins = [
  [
    "module-resolver",
    {
      root: ["./src"],
      alias: {
        "~/*": "./src",
      },
    },
  ],
];

module.exports = { presets, plugins };
