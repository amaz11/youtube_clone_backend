const asyncHandler = require("../middleware/asyncHandler");
const UserModel = require("../model/UserModel");
const { default: videoModel } = require("../model/videoModel");
const errorResponse = require("../utils/errorResponse");

const addVideo = asyncHandler(async (req, res, next) => {
  const newVideo = new videoModel({ userId: req.user.id, ...req.body });
  const savedVideo = await newVideo.save();
  res.status(200).json(savedVideo);
});

const updateVideo = asyncHandler(async (req, res, next) => {
  const video = await videoModel.findById(req.params.id);
  if (!video) return next(new errorResponse("Video not found!", 404));
  if (req.user.id === video.userId) {
    const updatedVideo = await videoModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedVideo);
  } else {
    return next(new errorResponse("You can update only your video!", 403));
  }
});

const deleteVideo = asyncHandler(async (req, res, next) => {
  const video = await videoModel.findById(req.params.id);
  if (!video) return next(new errorResponse("Video not found!", 404));
  if (req.user.id === video.userId) {
    await videoModel.findByIdAndDelete(req.params.id);
    res.status(200).json("The video has been deleted.");
  } else {
    return next(new errorResponse("You can delete only your video!", 403));
  }
});

const getVideo = asyncHandler(async (req, res, next) => {
  const video = await videoModel.findById(req.params.id);
  res.status(200).json(video);
});

const addView = asyncHandler(async (req, res, next) => {
  await videoModel.findByIdAndUpdate(
    req.params.id,
    {
      $inc: { views: 1 },
    },
    { new: true }
  );
  res.status(200).json("The view has been increased.");
});

const getByTag = asyncHandler(async (req, res, next) => {
  const tags = req.quary.tags;

  const videos = await videoModel.find({ tags: { $in: tags } }).limit(20);
  res.status(200).json(videos);
});

// get rendom video
const random = asyncHandler(async (req, res, next) => {
  const videos = await videoModel.aggregate([{ $sample: { size: 40 } }]);
  res.status(200).json(videos);
});

const search = asyncHandler(async (req, res, next) => {
  const quary = req.quary.q;

  const videos = await videoModel
    .find({ title: { $regex: quary, $options: "i" } })
    .limit(20);
  res.status(200).json(videos);
});

// get video of subscribed channels
const sub = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id);
  const subscribedChannels = user.subscribedUsers;

  const list = Promise.all(
    subscribedChannels.map(async (channelId) => {
      return await videoModel.find({ userId: channelId });
    })
  );
});

//trend video
const trend = asyncHandler(async (req, res, next) => {
  const videos = await videoModel.find().sort({ views: -1 });
  res.status(200).json(videos);
});

module.exports = {
  addVideo,
  updateVideo,
  deleteVideo,
  addView,
  getByTag,
  getVideo,
  random,
  search,
  sub,
  trend,
};
