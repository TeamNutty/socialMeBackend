const { Comment } = require('../models');
const fs = require('fs');
const util = require('util');
const cloundinary = require('cloudinary').v2;
const uploadPromise = util.promisify(cloundinary.uploader.upload);

exports.getAllComment = async (req, res, next) => {
  try {
    const comment = await Comment.findAll({});

    res.status(200).json({ comment });
  } catch (err) {
    next(err);
  }
};

exports.createComment = async (req, res, next) => {
  try {
    // const { postId } = req.params;
    const { message, commentUserId, postId } = req.body;

    await Comment.create({
      message,
      postId,
      commentUserId,
    });

    res.status(200).json({ message: 'comment has been create' });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const { id } = req.body;

    const row = await Comment.destroy({
      where: {
        id,
      },
    });

    if (!row) return res.status(400).json({ message: 'fail to  delete' });
    res.status(200).json({ message: 'delete success' });
  } catch (err) {
    next(err);
  }
};
