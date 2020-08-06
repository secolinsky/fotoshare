const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, "src/components"),
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]        
      },
      {
        test: /\.jsx?/,
        include: [
          path.resolve(__dirname, "src/components")
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.js?/,
        include: [
          path.resolve(__dirname, "src")
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
      
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  // resolve jsx files implicitly
  resolve: {
    extensions: ['.js', '.jsx']
  }
})
