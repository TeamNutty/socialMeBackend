const router = require('express').Router();
const PostController = require('../controller/PostController');
const { authenticate } = require('../controller/authController');
const { upload } = require('../middleware/upload');

router.get('/mypost', authenticate, PostController.getAllMyPost);
router.post('/', upload.single('picPost'), authenticate, PostController.createPost);

module.exports = router;
