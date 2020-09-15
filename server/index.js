var express = require('express');
var app = express();
var path = require('path')

// assign port 8080
app.listen( 8080, () => console.log("server started on port 8080") );

// serve static files
app.use('/static', express.static(path.resolve(__dirname, "../dist")));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
})


