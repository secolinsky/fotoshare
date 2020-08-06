const path = require('path');
/* setup from https://www.sitepoint.com/beginners-guide-webpack-module-bundling/ */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: { main: './src/assets/js/main.js',
           app: './src/components/app.jsx' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ title: 'fotoshare', inject: false, cache: false, template: 'src/index.html' })
    

  ]
};
