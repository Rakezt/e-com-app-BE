const Order = require('../models/ecomOrder');
const User = require('../models/ecomUser');
const Product = require('../models/ecomProduct');

// POST /api/user/orders  -> place order from cart
exports.placeOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');

    if (!user.cart.length) {
      return res.status(400).json({ errors: ['Cart is empty'] });
    }

    const items = user.cart.map((item) => ({
      product: item.product._id,
      qty: item.qty,
      priceAtPurchase: item.priceAtAddedTime || item.product.price,
    }));

    const totalAmount = items.reduce(
      (acc, item) => acc + item.qty * item.priceAtPurchase,
      0
    );

    const order = await Order.create({
      user: user._id,
      items,
      totalAmount,
    });

    // clear cart
    user.cart = [];
    await user.save();

    return res.status(201).json({ order });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /api/user/orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      'items.product'
    );
    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
