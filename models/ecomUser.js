const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ecomProduct',
      required: true,
    },
    qty: { type: Number, default: 1, min: 1 },
    priceAtAddedTime: { type: Number },
  },
  { id: false }
);
const WishListSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ecomProduct',
      required: true,
    },
  },
  { id: false }
);
const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    passwordHash: { type: String, required: true },
    cart: [CartItemSchema],
    wishlist: [WishListSchema],
  },
  { timestamps: true }
);
module.exports = mongoose.model('ecomUser', UserSchema);
