var express = require("express");
var app = express();
require("dotenv").config();
require("./db/db");
app.get("/", (req, res) => {
  res.send("Hello World, Hi there");
});

//error handler
app.use(require("./middleware/errorHandler"));

var server = app.listen(8081, function () {
  var port = server.address().port;

  console.log(`Example app listening at http://localhost:${port}`);
});
