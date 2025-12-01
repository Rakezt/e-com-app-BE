const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require('../controllers/wishlistController');

router.use(auth);

router.get('/', getWishlist); // GET /api/user/wishlist
router.post('/', addToWishlist); // POST /api/user/wishlist
router.delete('/:productId', removeFromWishlist); // DELETE /api/user/wishlist/:productId

module.exports = router;
