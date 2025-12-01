const Category = require('../models/ecomCategory');
const Product = require('../models/ecomProduct');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().exec();
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ errors: ['Category not found'] });
    }

    const products = await Product.find({
      categoryName: category.categoryName,
    });
    return res.status(200).json({ category, products });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
