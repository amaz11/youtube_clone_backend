var express = require("express");
var app = express();
require("dotenv").config();

// Database
require("./db/db");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//APIS
app.use("/api/auth/", require("./routes/auth"));

//error handler
app.use(require("./middleware/errorHandler"));

var server = app.listen(8081, function () {
  var port = server.address().port;

  console.log(`Example app listening at http://localhost:${port}`);
});
