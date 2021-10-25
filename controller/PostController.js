const { Post } = require('../models');

exports.getAllMyPost = async (req, res, next) => {
  try {
    const myPost = await Post.findAll({
      where: {
        id: req.user.id,
      },
    });
    return res.status(200).json({ myPost });
  } catch (err) {
    next(err);
  }
};
