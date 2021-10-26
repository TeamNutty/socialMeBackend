const router = require("express").Router();
const PostController = require("../controller/PostController");
const { authenticate } = require("../controller/authController");
const { upload } = require("../middleware/upload");

router.post("/", upload.single("picPost"), authenticate, PostController.createPost);
router.get("/mypost", authenticate, PostController.getAllMyPost);

module.exports = router;
