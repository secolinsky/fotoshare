var express = require('express');
var app = express();
var path = require('path')

// add webpack-dev-middleware
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('./../webpack.dev.js');
var compiler = webpack(webpackConfig);

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

// assign port 8080
app.listen( 8080, () => console.log("server started on port 8080") );
