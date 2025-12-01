const User = require('../models/ecomUser');
const Product = require('../models/ecomProduct');

exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist.product');
    return res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// POST /api/user/wishlist { productId }
exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ errors: ['productId is required'] });
  }

  try {
    const prod = await Product.findById(productId);
    if (!prod) return res.status(404).json({ errors: ['Product not found'] });

    const user = await User.findById(req.user._id);

    const exists = user.wishlist.some(
      (item) => item.product.toString() === productId
    );
    if (!exists) {
      user.wishlist.push({ product: productId });
    }

    await user.save();
    await user.populate('wishlist.product');

    return res.status(201).json({ wishlist: user.wishlist });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE /api/user/wishlist/:productId
exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;

  try {
    const user = await User.findById(req.user._id);
    user.wishlist = user.wishlist.filter(
      (item) => item.product.toString() !== productId
    );

    await user.save();
    await user.populate('wishlist.product');

    return res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
