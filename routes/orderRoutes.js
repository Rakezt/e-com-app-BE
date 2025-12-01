const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { placeOrder, getOrders } = require('../controllers/orderController');

router.use(auth);

router.post('/', placeOrder); // POST /api/user/orders
router.get('/', getOrders); // GET /api/user/orders

module.exports = router;
