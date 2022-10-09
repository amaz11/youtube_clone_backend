const router = require("express").Router();
const {
  addComment,
  deleteComment,
  getComments,
} = require("../controller/commentsController");
const { verifyToken } = require("../middleware/verifytoken");

router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", getComments);

module.exports = router;
