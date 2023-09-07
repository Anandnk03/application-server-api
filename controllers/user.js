const { result } = require('lodash');
const { db } = require('../models');
const bcrypt = require('bcryptjs');

const create = async (req, res) => {
  const { name, username, email, password, role } = req.body;
  try {
    // check if user already exited
    const userCheck = await db.User.findOne({
      where: {
        username,
        isDeleted: false,
      },
    });

    if (userCheck)
      return res.status(403).json({ msg: 'Username already exists' });

    const salt = bcrypt.genSaltSync(10);
    const userCreate = await db.User.create({
      name,
      username,
      email,
      password: bcrypt.hashSync(password, salt),
      role,
      isAdmin: role == 1 ? true : false,
    });

    // get user by id
    const user = await db.User.findOne({
      where: {
        id: userCreate.id,
      },
      attributes: {
        exclude: ['password','createdAt','updatedAt','isDeleted'],
      },
    });
    // get role by id
    // const roleData = await Role.findOne({
    //   where: {
    //     id: user.role,
    //   },
    // });
    // user.role = roleData;
    res.status(200).json({ msg:'User Created Successfully...!', Data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg:'Server Error'});
  }
};

const view = async (req, res) => {
  try {
    const users = await db.User.findAll({
      where: {
        isDeleted: false,
      },
      attributes: {
        exclude: ['createdAt','updatedAt','isDeleted'],
      },
    });
    let userData = [];
    users.map((da) => {
      userData.push({
        id: da.id,
        userId: da.userId,
        name: da.name,
        username: da.username,
        email: da.email,
        password: da.password,
        role: da.role,
        isAdmin: da.isAdmin == 1 ? 'true' : 'false',
      });
    });

    res.status(200).json({ msg: 'Users Founded..!', data: userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, userName, password, role, email } = req.body;
  console.log(req.body);
  try {
    // check if user already exists by username for other user id
    const userCheck = await db.User.findOne({
      where: {
        id: {
          [Op.ne]: id,
        },
        userName,
        isDeleted: false,
      },
    });
    if (userCheck) {
      return res.status(400).json({ msg: 'Username Already Exist' });
    }

    // get user by id
    const user = await db.User.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!user) {
      return res.status(404).json({ msg: 'User Not Founded' });
    }

    let userPassword = user.password;
    if (password != null && password != undefined && password != '') {
      const salt = bcrypt.genSaltSync(10);
      userPassword = bcrypt.hashSync(password, salt);
    }

    // update user
    const userUpdate = await db.User.update(
      {
        name,
        user,
        password: userPassword,
        role,
        email,
        isAdmin: role == 1 ? true : false,
      },
      {
        where: {
          id,
        },
      }
    );

    // get user by id
    const updatedUser = await db.User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'isDeleted'],
      },
    });

    // get role by id
    const roleData = await db.Role.findOne({
      where: {
        id: updatedUser.role,
      },
    });
    updatedUser.role = roleData;
    res.status(200).json({ msg: 'User Updated', data: updatedUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error', data: err });
  }
};

const archive = async (req, res) => {
  const { id } = req.params;
  try {
    // get user by id
    const user = await db.User.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!user) {
      return res.status(404).json({ msg: 'User Not Founded' });
    }
    // delete user
    await db.User.update(
      {
        isDeleted: true,
      },
      {
        where: {
          id,
        },
      }
    );
    const userData = await db.User.findAll({
      where: {
        isDeleted: false,
      },
    });
    res.status(200).json({ msg: 'User Deleted', data: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error', data: err });
  }
};

const changePassword = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;
  try {
    // get user by id
    const user = await User.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!user) {
      return res.status(404).json({ msg: 'User Not Founded' });
    }

    // password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Passsword Mismatch' });
    }

    // changes password
    const salt = bcrypt.genSaltSync(10);
    const userChangePassword = await User.update(
      {
        password: bcrypt.hashSync(newPassword, salt),
      },
      {
        where: {
          id,
        },
      }
    );
    res
      .status(200)
      .json({ msg: 'User Password Changed', data: userChangePassword });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error', data: err });
  }
};

module.exports = {
  create,
  view,
  update,
  archive,
};
