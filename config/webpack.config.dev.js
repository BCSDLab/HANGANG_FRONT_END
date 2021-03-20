const path = require("path");

const MODE = process.env.NODE_ENV;
const ENTRY = path.join(__dirname, "..", "src", "index.js");
const OUTPUT = path.join(__dirname, "..", "dist");

const config = {
  entry: ENTRY,
  output: {
    path: OUTPUT,
    filename: "bundle.js",
  },
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};

module.exports = config;
