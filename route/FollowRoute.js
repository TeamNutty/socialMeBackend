const router = require("express").Router();
const FollowController = require("../controller/FollowController");
const { authenticate } = require("../controller/authController");

router.post("/:id", authenticate, FollowController.addFollow);
router.delete("/unfollow/:id", authenticate, FollowController.unfollow);
router.get("/getAllFollow", authenticate, FollowController.getAllFollow);

module.exports = router;
