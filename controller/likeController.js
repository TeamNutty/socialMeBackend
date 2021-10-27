const { Post, Like } = require('../models');


exports.addLike = async (req, res, next) => {
  try {
    const { postId } = req.body;
    console.log(postId);
    console.log(req.user.id);


    await Like.create({
      postId,
      userId: req.user.id
    });
    res.status(200).json({ message: 'Like success' });
  } catch (error) {
    res.json({ message: error });
  }
};

exports.removeLike = async (req, res, next) => {
  try {
    // console.log('below is postId for removeLike');
    // console.log(req.params);
    const { postId } = req.params;
    // console.log(postId);
    const rows = await Like.destroy({
      where: {
        postId,
        userId: req.user.id
      },
    });
    if (!rows) return res.status(400).json({ message: 'fail to  delete' });
    res.status(200).json({ message: 'delete success' });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
