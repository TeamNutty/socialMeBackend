const router = require('express').Router();
const OmiseController = require('../controller/OmiseController');
const { authenticate } = require('../controller/authController');

router.post('/', authenticate, OmiseController.buyPost);

module.exports = router;
