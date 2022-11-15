const path = require("path");

module.exports = {
  entry: [path.join(__dirname, "/src/index.ts")],
  devtool: "inline-source-map",
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    library: "ts",
    libraryTarget: "umd",
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /.scss$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].css",
              outputPath: "css/"
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  mode: "development"
};
