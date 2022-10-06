var express = require("express");
var app = express();

app.get("/", (req, res) => {
  res.send("Hello World, Hi there");
});

var server = app.listen(8081, function () {
  var port = server.address().port;

  console.log(`Example app listening at http://localhost:${port}`);
});
