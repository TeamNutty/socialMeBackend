const { Comment, User } = require('../models');
const fs = require('fs');
const util = require('util');
const cloundinary = require('cloudinary').v2;
const uploadPromise = util.promisify(cloundinary.uploader.upload);

exports.getAllComment = async (req, res, next) => {
  try {
    const comment = await Comment.findAll({
      include: [
        {
          as: 'commentUser',
          model: User,
          attributes: ['firstName', 'lastName', 'profilePicture'],
          require: true,
        },
      ],
    });

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
    const { id } = req.params;

    const row = await Comment.destroy({
      where: {
        id,
        commentUserId: req.user.id,
      },
    });

    if (!row) return res.status(400).json({ message: 'fail to  delete' });
    res.status(200).json({ message: 'delete success' });
  } catch (err) {
    next(err);
  }
};
exports.editComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const [row] = await Comment.update(
      {
        message,
      },
      {
        where: {
          id,
          commentUserId: req.user.id,
        },
      }
    );

    if (row === 0) {
      return res.status(400).json({ message: 'fail to edit comment' });
    }
    res.status(200).json({ message: 'edit comment success' });
  } catch (err) {
    next(err);
  }
};
