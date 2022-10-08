const jwt = require("jsonwebtoken");
const errorResponse = require("../utils/errorResponse");

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(errorResponse("You are not authenticated!", 401));

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(errorResponse("Token is not valid!"), 403);
    req.user = user;
    next();
  });
};
