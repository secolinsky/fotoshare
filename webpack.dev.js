const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  mode: 'development',
  devtool: "inline-source-map",
  entry: { main: './src/assets/js/main.js',
           app: ['./src/components/app.jsx', 'webpack-hot-middleware/client']},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },  
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  module: {
    rules: [      
      {        
        test: /\.scss$/,
        include: [ path.resolve(__dirname, "src/components"), path.resolve(__dirname, "scss")],
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
  // resolve jsx files implicitly
  resolve: {
    extensions: ['.js', '.jsx']
  }
})
