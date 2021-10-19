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
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ errUsername: 'username or password is invalid' });
    }
    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      return res.status(400).json({ errPassword: 'username or password is invalid' });
    }

    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
    res.json({ message: 'login sucess', token });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.status(400).json({ errEmail: 'email has already exists' });
    }
    if (password !== confirmPassword) {
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
