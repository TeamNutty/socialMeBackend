const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.authenticate = async (req, res, next) => {
  try {
    // get request headers
    // const headers = req.headers;
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer')) {
      return res.status(401).json({ message: 'you are unauthorized' });
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'you are unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // decoded { id: , email: , username }

    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({ message: 'you are unauthorized' });
    }
    req.user = user;
    req.data = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, ConfirmPassword } = req.body;

    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.status(400).json({ errEmail: 'email has already exists' });
    }
    if (password !== ConfirmPassword) {
      return res.status(400).json({ errPassword: 'password and confirm password did not match' });
    }
    const hasedPassword = await bcrypt.hash(password, 12);
    await User.create({
      firstName,
      lastName,
      email,
      password: hasedPassword,
    });
    res.status(200).json({ message: 'you account has been created' });
  } catch (err) {
    next(err);
  }
};
