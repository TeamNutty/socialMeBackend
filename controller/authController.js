const { User } = require('../models');

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
  } catch (err) {
    next(err);
  }
};
