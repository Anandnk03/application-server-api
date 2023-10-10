const { db } = require('../models/index');

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
    if (id === 'undefined') {
      return res.status(404).json({ msg: 'Params is undefined...!' });
    }
    const machine = await db.sequelize.query(`PRC_GET_ALL_MACHINE '${id}'`);
    res.status(200).json({ msg: 'Machine Found..!', data: machine });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const machineName = async (req, res) => {
  try {
    const data = await db.sequelize.query(`PRC_Get_MachineName`);
    res.status(200).json({ msg: 'Machine Found !', data: data[0] });
  } catch (error) {
    console.log(error);
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

const Type4M = async (req, res) => {
  try {
    const type = await db.sequelize.query('Get_4MTypes');
    res.status(200).json({ msg: '4MType Found..!', data: type });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const gapReasonMaster = async (req, res) => {
  const { Mid, id } = req.params;
  try {
    const master = await db.sequelize.query(
      `PRC_GET_GAPREASONSLIST ${Mid},${id}`
    );
    res.status(200).json({ msg: 'Reason Master Found..!', data: master });
  } catch (error) {
    console.log(error);
    res.status(200).json({ msg: 'Server Error' });
  }
};

const machineData = async (req, res) => {
  try {
    const data = await db.sequelize.query(`Get_Machine`);
    res.status(200).json({ msg: 'Machine Found..!', data: data[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const getComponentData = async (req, res) => {
  try {
    const data = await db.sequelize.query('PRC_Get_Component_Data');
    res
      .status(200)
      .json({ msg: 'SuccessFully Get the Component Data', data: data[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const getOperationData = async (req, res) => {
  try {
    const data = await db.sequelize.query('PRC_Get_Operation_Data');
    res
      .status(200)
      .json({ msg: 'SuccessFully Get the Operation Data', data: data[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const getMachineOperationData = async (req, res) => {
  try {
    const data = await db.sequelize.query('PRC_Get_MachineOperation_Data');
    res.status(200).json({
      msg: 'SuccessFully Get the MachineOperation Data',
      data: data[0],
    });
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
  Type4M,
  gapReasonMaster,
  machineData,
  machineName,
  getComponentData,
  getOperationData,
  getMachineOperationData,
};
