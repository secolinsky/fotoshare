const path = require('path');
/* setup from https://www.sitepoint.com/beginners-guide-webpack-module-bundling/ */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: { main: './scss/main.scss',
           app: './src/components/app.jsx'},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({ title: 'fotoshare', inject: false, template: 'src/index.html' })
    

  ]
};
