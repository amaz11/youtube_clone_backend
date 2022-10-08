const jwt = require("jsonwebtoken");
const errorResponse = require("../utils/errorResponse");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(new errorResponse("You are not authenticated!", 401));

  jwt.verify(token, process.env.JWT_PASS, (err, user) => {
    if (err) return next(new errorResponse("Token is not valid!"), 403);
    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
