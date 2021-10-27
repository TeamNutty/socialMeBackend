const router = require('express').Router();
const CommentController = require('../controller/CommentController');
const { authenticate } = require('../controller/authController');
const { upload } = require('../middleware/upload');

router.get('/', authenticate, CommentController.getAllComment);
router.post('/create', authenticate, CommentController.createComment);
router.put('/edit/:id', authenticate, CommentController.editComment);
router.delete('/delete/:id', authenticate, CommentController.deleteComment);

module.exports = router;
