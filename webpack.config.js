const path = require("path");

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: {
    popup: "./src/popup.ts",
    content: "./src/content.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  optimization: {
    minimize: false, // Optional: set to true if you want minified output
  },
};
