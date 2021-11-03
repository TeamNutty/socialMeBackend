const { OrderItemPost } = require('../models');

const omise = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

exports.buyPost = async (req, res, next) => {
  const { price, tokenOmise, postId } = req.body;
  // console.log(req.body);
  try {
    //   username, amount, token
    // const customer = await omise.customers.create({
    //   email: req.user.email,
    //   //   description: 'John Doe (id: 30)',
    //   // card: token.id
    //   card: 'tokn_test_5pma359qozi8v2z43lk',
    // });

    const charge = await omise.charges.create({
      amount: price * 100,
      currency: 'thb',
      //   customer: customer.id,
      card: tokenOmise,
      metadata: { userId: req.user.id, postId: postId },
    });
    if (charge.status === 'successful') {
      await OrderItemPost.create({ userId: req.user.id, postId });
      res.status(400).json({ message: 'done' });
    } else {
      return res.status(401).json({ message: 'buy fail' });
    }
  } catch (err) {
    next(err);
  }
};
