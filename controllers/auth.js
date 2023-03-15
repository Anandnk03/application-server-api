const models = require('../models');
const User = models.User;
const Role = models.Role;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ENV = require('../data/env');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // check if user alter exited in username
    const user = await User.findOne({
      where: {
        username,
        isDeleted: false,
      },
    });

    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    //check if password correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    // create jwt token
    const payload = {
      id: user.id,
      name: user.name,
      isAdmin: user.isAdmin,
    };

    // generate jwt token
    const token = await jwt.sign(payload, ENV.JWT_SECRET, {
      expiresIn: ENV.JWT_EXPIRATION,
    });
    // generate refresh jwt token
    const refreshToken = await jwt.sign(payload, ENV.REFRESH_TOKEN_SECRET, {
      expiresIn: ENV.REFRESH_TOKEN_EXPIRATION,
    });

    res.status(200).json({
      msg: 'Login successful',
      token,
      refreshToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  login,
};
