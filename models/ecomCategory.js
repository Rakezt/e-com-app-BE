const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true, trim: true },
    images: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model('ecomCategory', CategorySchema);
