const router = require("express").Router();
const PostController = require("../controller/PostController");
const { authenticate } = require("../controller/authController");
const { upload } = require("../middleware/upload");

// test
router.get("/", authenticate, (req, res) => {
    res.send("connect");
});

router.get("/mypost", authenticate, PostController.getAllMyPost);
router.get("/:id", authenticate, PostController.getAllPostbyid);
router.post("/", upload.array("picPostUrl"), authenticate, PostController.createPost);
router.delete("/:postId", authenticate, PostController.delPost);

// post on orderItemPsost
router.post("/", authenticate, PostController.buyPost);
module.exports = router;
