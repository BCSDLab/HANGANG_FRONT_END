const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const MODE = process.env.NODE_ENV;
const ENTRY = path.join(__dirname, "..", "src", "index.js");
const OUTPUT = path.join(__dirname, "..", "build");

module.exports = {
  entry: ENTRY,
  output: {
    path: OUTPUT,
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [
    new Dotenv({
      path: path.join(__dirname, "..", `.env.${MODE}`),
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
};
