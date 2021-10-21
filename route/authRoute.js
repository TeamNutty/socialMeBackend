const router = require('express').Router();

const authController = require('../controller/authController');
const { upload } = require('../middleware/upload');

router.post('/login', authController.login);
router.post('/register', upload.single('picture'), authController.register);

module.exports = router;
