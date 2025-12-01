const router = require('express').Router();
const {
  getCategories,
  getCategoryById,
} = require('../controllers/categoryController');

router.get('/', getCategories); // /api/categories
router.get('/:categoryId', getCategoryById); // /api/categories/:categoryId

module.exports = router;
