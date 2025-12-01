const Product = require('../models/ecomProduct');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const featuredIds = [
      '692a2f1f47edaa911267d336',
      '692a2f3d47edaa911267d349',
      '692affcfeafb25f14f5d6480',
    ];

    const formatted = products.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      image: [{ url: p.images }],
      price: p.price,
      company: p.company || 'SkateBrand',
      colors: p.colors || ['#000000'],
      category: p.categoryName,
      featured: featuredIds.includes(p._id.toString()),
      stock: p.stock || 20,
      stars: p.rating,
      reviews: p.reviews || 24,
      description: p.descriptions,
    }));

    res.json(formatted);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Not found' });

    const formatted = {
      id: p._id.toString(),
      name: p.name,
      image: [{ url: p.images }],
      price: p.price,
      company: p.company || 'YourSweetNightmare',
      colors: p.colors || ['#000000'],
      category: p.categoryName,
      featured: false,
      stock: p.stock || 20,
      stars: p.rating,
      reviews: p.reviews || 24,
      description: p.descriptions,
    };

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
