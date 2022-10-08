const asyncHandler = require("../middleware/asyncHandler");
const UserModel = require("../model/UserModel");
const errorResponse = require("../utils/errorResponse");

const update = asyncHandler(async (req, res, next) => {
  if (req.params.id === req.user.id) {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } else {
    return next(errorResponse("You can update only your account!", 403));
  }
});

const deleteUser = asyncHandler(async (req, res, next) => {
  if (req.params.id === req.user.id) {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User Delete Sussecsfully");
  } else {
    return next(errorResponse("You can delete only your account!", 403));
  }
});

const getUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);
  res.status(200).json(user);
});

const subscribe = asyncHandler(async (req, res, next) => {
  await UserModel.findById(req.user.id, {
    $push: { subscribeUsers: req.params.id },
  });
  await UserModel.findByIdAndUpdate(req.params.id, { $inc: { subscribe: 1 } });

  res.status(200).json("Subscribe Successfull");
});

const unsubscribe = asyncHandler(async (req, res, next) => {
  await UserModel.findById(req.user.id, {
    $pull: { subscribeUsers: req.params.id },
  });
  await UserModel.findByIdAndUpdate(req.params.id, { $inc: { subscribe: -1 } });

  res.status(200).json("Unsubscribe Successfull");
});

const like = asyncHandler(async (req, res, next) => {});

const dislike = asyncHandler(async (req, res, next) => {});

module.exports = {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
};
