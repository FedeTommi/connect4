const path = require('path')
const process = require("process")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/js/main.jsx',
  mode: process.env.NODE_ENV || "development",
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/css', to: 'dist' },
      ],
    }),
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new FaviconsWebpackPlugin("./src/svg/favicon.svg"),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  }
}