const moment = require('moment');
const { db } = require('../models/index');
const sql = require('mssql');

const department = async (req, res) => {
  try {
    const dept = await db.sequelize.query('Get_Department');
    res.status(200).json({ msg: 'Department Found!', data: dept });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'server Error' });
  }
};

const modules = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const module = await db.sequelize.query(`Get_Modules ${id}`);
    res.status(200).json({ msg: 'Module Found!', data: module });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const machine = async (req, res) => {
  const { id } = req.params;
  try {
    const machine = await db.sequelize.query(`PRC_GET_ALL_MACHINE ${id}`);
    res.status(200).json({ msg: 'Machine Found..!', data: machine });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const product = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await db.sequelize.query(
      `PRC_GET_PRODUCTBY_MACHINE  ${id}`
    );
    res.status(200).json({ msg: 'Product Found..!', data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
module.exports = {
  department,
  modules,
  machine,
  product,
};
