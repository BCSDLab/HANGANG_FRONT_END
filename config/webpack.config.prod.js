// 추후에 uglify 추가할것

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const MODE = process.env.NODE_ENV;
const ENTRY = path.join(__dirname, "..", "src", "index.js");
const OUTPUT = path.join(__dirname, "..", "build");

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
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./build"),
    historyApiFallback: true, //  새로 고침 시
  },
};

module.exports = config;
