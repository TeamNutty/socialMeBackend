const { User, Post, Like, OrderItemPost } = require('../models');
const util = require('util');
const cloudinary = require('cloudinary').v2;
const uploadPromise = util.promisify(cloudinary.uploader.upload);
const fs = require('fs');

// โพสทังหมด
exports.getAllMyPost = async (req, res, next) => {
  try {
    // const { id } = req.params;
    const myPostList = await Post.findAll({
      where: {
        userId: req.user.id,
      },
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName', 'profilePicture'],
          require: true,
        },
      ],
    });
    // console.log(myPostList);
    return res.status(200).json({ myPostList });
  } catch (err) {
    next(err);
  }
};
exports.getAllPostbyid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const myPostList = await Post.findAll({
      where: {
        userId: id,
      },
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName', 'profilePicture'],
          require: true,
        },
        {
          model: Like,
          attributes: ['userId', 'postId'],
          require: true,
        },
        {
          model: OrderItemPost,
          attributes: ['userId'],
          require: true,
        },
      ],
    });
    // console.log(myPostList);
    return res.status(200).json({ myPostList });
  } catch (err) {
    next(err);
  }
};

// สร้างโพส
exports.createPost = async (req, res, next) => {
  try {
    const { userId, message, status, price } = req.body;
    const forCreatePost = {
      userId,
      message,
      status,
      price,
    };

    const result = await Promise.all(req.files.map(item => uploadPromise(item.path, { timeout: 2000000 })));
    // console.log(result.length);
    if (result.length > 0) {
      const arrPicUrl = result.map(item => item.secure_url);
      forCreatePost.picturePost = arrPicUrl;
      // console.log(arrPicUrl);
      // res.json({ message: 'have img' });
    }
    // console.log(forCreatePost);
    await Post.create(forCreatePost);
    res.status(200).json({ message: 'create post success' });
  } catch (error) {
    res.json({ message: error });
  }
};

exports.delPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    // console.log('below is postid');
    // console.log(postId);
    const rows = await Post.destroy({
      where: {
        id: postId,
      },
    });
    if (!rows) return res.status(400).json({ message: 'fail to  delete' });
    res.status(200).json({ message: 'delete success' });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.editMsgPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { message } = req.body;
    console.log(req.params);
    console.log(req.body);
    // let result = null;

    const rows = await Post.update(
      {
        message
      }, {
      where: {
        id: postId
      },
    }
    );

    if (rows === 0) {
      return res.status(400).json({ errUpdateUser: 'update msg post fail' });
    }
    return res.status(200).json({ message: 'update msg post success' });
  } catch (err) {
    next(err);
  }
};