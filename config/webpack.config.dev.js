const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const MODE = process.env.NODE_ENV;
const ENTRY = path.join(__dirname, "..", "src", "index.js");
const OUTPUT = path.join(__dirname, "..", "build");

const config = {
  entry: ENTRY,
  output: {
    path: OUTPUT,
    publicPath: "/",
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
  plugins: [
    new Dotenv({
      path: path.join(__dirname, "..", `.env.${MODE}`),
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devtool: "source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "./build"),
    historyApiFallback: true, //  새로 고침 시
  },
};

module.exports = config;
