const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/ecomUser');

exports.signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(422).json({ error: 'User Already exist' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstname,
      lastname,
      email,
      passwordHash,
      cart: [],
      wishlist: [],
    });
    const token = jwt.sign({ _id: user._id, email }, process.env.JWT_SECRET);
    const userSafe = user.toObject();
    delete userSafe.passwordHash;
    return res.status(201).json({ createdUser: userSafe, encodedToken: token });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Email is not register' });
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(404).json({ error: 'Wrong password enter' });
    }
    const token = jwt.sign({ _id: user._id, email }, process.env.JWT_SECRET);
    const userSafe = user.toObject();
    delete userSafe.passwordHash;
    res.status(200).json({ foundUser: userSafe, encodedToken: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
