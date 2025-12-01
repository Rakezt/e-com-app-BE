const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    images: { type: String, required: true },
    categoryName: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    descriptions: { type: String },
    details: { type: String },
    specifications: [String],
    company: { type: String, default: 'YourSweetNightmare' },
    colors: { type: [String], default: ['#000000'] },
    stock: { type: Number, default: 20 },
    reviews: { type: Number, default: 25 },
  },
  { timestamps: true }
);
module.exports = mongoose.model('ecomProduct', ProductSchema);
