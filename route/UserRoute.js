const router = require("express").Router();
const { authenticate } = require("../controller/authController");
const UserController = require("../controller/UserController");
const { upload } = require("../middleware/upload");

router.get("/", UserController.getAllUser);

router.get("/oneUser", authenticate, UserController.getOneUser);
router.get("/otherUser/:id", authenticate, UserController.getOtherUser);

router.put("/userUpdate/:id", authenticate, upload.single("picture"), UserController.updateUser);
router.put("/password/:id", authenticate, UserController.updateUserPassword);

module.exports = router;
