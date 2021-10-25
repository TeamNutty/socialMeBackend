const router = require('express').Router();

const PostController = require('../controller/PostController');
const { authenticate } = require('../controller/authController');

router.get('/', authenticate, PostController.getAllMyPost);

module.exports = router;
