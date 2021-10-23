const { User } = require('../models');
const fs = require('fs');
const util = require('util');
const cloundinary = require('cloudinary').v2;
const uploadPromise = util.promisify(cloundinary.uploader.upload);
const bcrypt = require('bcryptjs');

exports.getAllUser = async (req, res, next) => {
  try {
    const allUser = await User.findAll();

    return res.status(200).json({ allUser });
  } catch (err) {
    next(err);
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    const oneUser = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    return res.status(200).json({ oneUser });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, birthDate, bio } = req.body;

    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.status(400).json({ errEmail: 'email has already exists' });
    }
    const result = await uploadPromise(req.file.path, { timeout: 60000000 });

    const [rows] = await User.update(
      {
        firstName,
        lastName,
        email,
        birthDate,
        bio: bio || null,
        profilePicture: result.secure_url,
      },
      {
        where: {
          id,
          id: req.user.id,
        },
      }
    );
    fs.unlinkSync(req.file.path);
    if (rows === 0) {
      return res.status(400).json({ errUpdateUser: 'update user account fail' });
    }
    return res.status(200).json({ message: 'update account success' });
  } catch (err) {
    next(err);
  }
};

exports.updateUserPassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { currentPassword, password, confirmPassword } = req.body;

    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    const checkCurrentPassword = await bcrypt.compare(currentPassword, user.password);
    if (!checkCurrentPassword) {
      return res.status(400).json({ errCurrentPassword: 'Current password is Wrong!!' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ errPassword: 'password and confirm password did not match' });
    }
    const hasedPassword = await bcrypt.hash(password, 12);
    const [rows] = await User.update(
      {
        password: hasedPassword,
      },
      {
        where: {
          id,
          id: req.user.id,
        },
      }
    );
    if (rows === 0) {
      res.status(400).json({ eerPassword: 'update password fail' });
    }
    res.status(200).json({ message: 'New password has been changes' });
  } catch (err) {
    next(err);
  }
};
