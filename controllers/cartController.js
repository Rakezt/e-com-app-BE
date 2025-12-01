const User = require('../models/ecomUser');
const Product = require('../models/ecomProduct');

exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');
    return res.status(200).json({ cart: user.cart });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/user/cart { productId, qty? }
exports.addToCart = async (req, res) => {
  const { productId, qty } = req.body;

  if (!productId) {
    return res.status(400).json({ errors: ['productId is required'] });
  }

  try {
    const prod = await Product.findById(productId);
    if (!prod) return res.status(404).json({ errors: ['Product not found'] });

    const user = await User.findById(req.user._id);

    const existing = user.cart.find(
      (item) => item.product.toString() === productId
    );

    const quantityToAdd = qty && qty > 0 ? qty : 1;

    if (existing) {
      existing.qty += quantityToAdd;
    } else {
      user.cart.push({
        product: productId,
        qty: quantityToAdd,
        priceAtAddedTime: prod.price,
      });
    }

    await user.save();
    await user.populate('cart.product');

    return res.status(201).json({ cart: user.cart });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/user/cart/:productId { action: { type: "increment" | "decrement" } }
exports.updateCartItem = async (req, res) => {
  const { productId } = req.params;
  const { action } = req.body;

  if (!action || !action.type) {
    return res.status(400).json({ errors: ['action.type is required'] });
  }

  try {
    const user = await User.findById(req.user._id);
    const item = user.cart.find((c) => c.product.toString() === productId);

    if (!item)
      return res.status(404).json({ errors: ['Item not found in cart'] });

    if (action.type === 'increment') {
      item.qty += 1;
    } else if (action.type === 'decrement') {
      item.qty = Math.max(1, item.qty - 1);
    }

    await user.save();
    await user.populate('cart.product');

    return res.status(200).json({ cart: user.cart });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE /api/user/cart/:productId
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter((c) => c.product.toString() !== productId);
    await user.save();
    await user.populate('cart.product');

    return res.status(200).json({ cart: user.cart });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
