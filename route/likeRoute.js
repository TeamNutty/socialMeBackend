const router = require("express").Router();
const likeController = require("../controller/likeController");
const { authenticate } = require("../controller/authController");

router.post("/", authenticate, likeController.addLike);
router.get("/:postId", authenticate, likeController.getLikeByPostId);
router.delete("/:postId", authenticate, likeController.removeLike);

module.exports = router;
