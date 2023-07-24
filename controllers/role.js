const { db } = require('../models');
const { Op } = require('sequelize');
const create = async (req, res) => {
  const { name, permissionData } = req.body;
  console.log(req.body);
  try {
    // check if role already exists by name
    const roleCheck = await db.Role.findOne({
      where: {
        name,
        isDeleted: false,
      },
    });
    if (roleCheck) {
      return res.status(404).json({ msg: 'Role Name already exists' });
    }

    // create role
    const roleCreate = await db.Role.create({
      name,
      access: permissionData,
    });

    // get role by id
    const role = await db.Role.findOne({
      where: {
        id: roleCreate.id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'isDeleted'],
      },
    });

    res.status(201).json({ msg: 'Role Created', data: role });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error', data: err });
  }
};

const getAll = async (req, res) => {
  try {
    const roles = await db.Role.findAll({
      where: {
        isDeleted: false,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'isDeleted'],
      },
    });
    res.status(200).json({ msg: 'Roles Founded', data: roles });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error', data: err });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    // check if role already exists by name for other role id
    const roleCheck = await db.Role.findOne({
      where: {
        id: {
          [Op.ne]: id,
        },
        name,
        isDeleted: false,
      },
    });
    if (roleCheck) {
      return res.status(400).json({ msg: 'RoleName Already Exist' });
    }

    // get role by id
    const role = await db.Role.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!role) {
      return res.status(404).json({ msg: 'Role Not Founded' });
    }

    // update role
    const roleUpdate = await db.Role.update(
      {
        name,
      },
      {
        where: {
          id,
        },
      }
    );

    // get role by id
    const updatedRole = await db.Role.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'isDeleted'],
      },
    });
    res.status(200).json({ msg: 'Role Updated', data: updatedRole });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error', data: err });
  }
};

const archive = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    // get role by id
    const role = await db.Role.findOne({
      where: {
        id: id,
        isDeleted: false,
      },
    });
    if (!role) {
      return res.status(404).json({ msg: 'Role Not Founded' });
    }

    // delete role
    await db.Role.update(
      {
        isDeleted: true,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({ msg: 'Role Deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error', data: err });
  }
};

module.exports = {
  create,
  getAll,
  update,
  archive,
};
