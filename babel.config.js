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

module.exports = { presets };
