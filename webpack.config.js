var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
console.log(path.resolve(__dirname, "dist"));
module.exports = {
  mode: "development",
  entry: "./js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [new HtmlWebpackPlugin()],
  devtool: "source-map",
};
