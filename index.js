require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/user/cart', cartRoutes);
app.use('/api/user/wishlist', wishlistRoutes);
app.use('/api/user/orders', orderRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo DB Connected'))
  .catch((err) => console.log('Mongo DB connection failed', err.message));

const PORT = process.env.PORT || 5030;
app.listen(PORT, () => console.log(`server running on port : ${PORT} `));
