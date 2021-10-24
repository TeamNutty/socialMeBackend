const router = require('express').Router();
const { authenticate } = require('../controller/authController');
const UserController = require('../controller/UserController');
const { upload } = require('../middleware/upload');

router.get('/', authenticate, UserController.getAllUser);

router.get('/oneUser', authenticate, UserController.getOneUser);

router.put('/:userId', authenticate, upload.single('picture'), UserController.updateUser);
router.put('/password/:userId', authenticate, UserController.updateUserPassword);

module.exports = router;
