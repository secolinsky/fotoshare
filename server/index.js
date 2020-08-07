var express = require('express');
var app = express();
var path = require('path')

// add webpack-dev-middleware
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('./webpack.dev.config');
var compiler = webpack(webpackConfig);

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
}));

// assign port 8080
app.listen( 8080, () => console.log("server started on port 8080") );

app.use(require("webpack-hot-middleware")(compiler));
// serve static files
// app.use('/static', express.static(path.resolve(__dirname, "../dist")));

//app.get('/', function (req, res) {
//  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
//})
