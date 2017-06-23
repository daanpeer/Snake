const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',

  target: 'web',

  entry: [
    path.join(__dirname, './src/index.ts'),
  ],

  output: {
    publicPath: '/',
    path: path.join(__dirname, './dist'),
    filename: 'bundle-[hash:5].js',
  },

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000
  },

  module: {
    rules: [
      {
        test: /(\.ts)$/,
        include: [path.join(__dirname, './src')],
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  plugins: [
    new HtmlWebpackPlugin({ template: path.join(__dirname, './src/index.html') }),
  ]
};
