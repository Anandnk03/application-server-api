const { User, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');

const create = async (req, res) => {
  const { name, username, email, password, role } = req.body;

  try {
    // check if user already exited
    const userCheck = await User.findOne({
      where: {
        username,
        isDeleted: false,
      },
    });

    if (userCheck)
      return res.status(404).json({ msg: 'Username already exists' });

    const salt = bcrypt.genSaltSync(10);
    const userCreate = await User.create({
      name,
      username,
      email,
      password: bcrypt.hashSync(password, salt),
      role,
      isAdmin: role == 1 ? true : false,
    });

    // get user by id
    const user = await User.findOne({
      where: {
        id: userCreate.id,
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'isDeleted'],
      },
    });
    // get role by id
    // const roleData = await Role.findOne({
    //   where: {
    //     id: user.role,
    //   },
    // });
    // user.role = roleData;
    res.status(200).json({ msg: 'User Created', Data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = {
  create,
};
