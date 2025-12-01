const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} = require('../controllers/cartController');

router.use(auth);

router.get('/', getCart); // GET /api/user/cart
router.post('/', addToCart); // POST /api/user/cart
router.post('/:productId', updateCartItem); // POST /api/user/cart/:productId
router.delete('/:productId', removeFromCart); // DELETE /api/user/cart/:productId

module.exports = router;
