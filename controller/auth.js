const asyncHandler = require("../middleware/asyncHandler");
const UserModel = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorRespose = require("../utils/errorResponse");

const signup = asyncHandler(async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const newUser = new UserModel({ ...req.body, password: hash });

  await newUser.save();
  res.status(200).json({ message: "User has been created!" });
});

const signin = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findOne({ name: req.body.name });
  if (!user) return next(new errorRespose("User not found!", 404));

  const isCorrect = await bcrypt.compare(req.body.password, user.password);

  if (!isCorrect) return next(new errorRespose("Wrong Credentials!", 400));

  const token = jwt.sign({ id: user._id }, process.env.JWT_PASS);
  const { password, ...others } = user._doc;

  res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json(others);
});

module.exports = { signup, signin };
