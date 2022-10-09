const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
// require("jsonwebtoken");

// Database
require("./db/db");

// middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//APIS
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/videos", require("./routes/videoRoutes"));

//error handler
app.use(require("./middleware/errorHandler"));

var server = app.listen(8081, function () {
  var port = server.address().port;

  console.log(`Example app listening at http://localhost:${port}`);
});
