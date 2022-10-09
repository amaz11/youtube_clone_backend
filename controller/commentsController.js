const asyncHandler = require("../middleware/asyncHandler");
const { default: CommentsModel } = require("../model/CommentsModel");
const videoModel = require("../model/videoModel");
const erroResponse = require("../utils/errorResponse");

const addComment = asyncHandler(async (req, res, next) => {
  const newComments = new CommentsModel({ ...req.body, userId: req.user.id });

  const savedComment = await newComments.save();
  res.status(201).json(savedComment);
});

const deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await CommentsModel.findById(req.param.id);
  const video = await videoModel.findById(req.param.id);
  if (comment.userId === req.user.id || req.uesr.id === video.userId) {
    await CommentsModel.findByIdAndDelete(req.param.id);
    res.status(200).json("The comment has been deleted.");
  } else {
    next(new erroResponse("You can delete only your comment!", 403));
  }
});

const getComments = asyncHandler(async (req, res, next) => {
  const comments = await CommentsModel.find({ videoId: req.params.id });
  res.status(200).json(comments);
});

module.exports = { addComment, deleteComment, getComments };
