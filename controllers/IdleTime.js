const { db, poolPromise } = require('../models');
const sql = require('mssql');

const MachineOffLine = async (req, res) => {
  try {
    const data = await db.sequelize.query('PRC_GET_OFFLINEMACHINE');

    return res.status(200).json({ msg: 'Machine Founded..!', data: data[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const AddMachine = async (req, res) => {
  const { MachineName, AssemblyId, AssemblySequence } = req.body;

  try {
    const pool = await poolPromise;
    const Machine = await pool
      .request()
      .input('pIn_MachineName', sql.VarChar(250), MachineName)
      .input('pIn_AssemblyId', sql.Int, AssemblyId)
      .input('pIn_AssemblySequence', sql.Int, Number(AssemblySequence))
      .execute(`PRC_INSERT_MACHINEOFFLINE`);
    const data = Machine.recordset[0];
    return res
      .status(200)
      .json({ msg: 'Machine Add Successfully...!', data: data });
  } catch (error) {
    console.log(error);
  }
};

const updateMachine = async (req, res) => {
  const { MachineName, AssemblyId, AssemblySequence, MachineId } = req.body;
  console.log(req.body);
  try {
    const pool = await poolPromise;
    const Machine = await pool
      .request()
      .input('pIn_MachineName', sql.VarChar(250), MachineName)
      .input('pIn_AssemblyId', sql.Int, AssemblyId)
      .input('pIn_AssemblySequence', sql.Int, Number(AssemblySequence))
      .input('pIn_MachineId', sql.Int, Number(MachineId))
      .execute(`PRC_UPDATE_MACHINEOFFLINE`);
    const data = Machine.recordset[0];
    return res
      .status(200)
      .json({ msg: 'Machine Updated Successfully...!', data: data });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  MachineOffLine,
  AddMachine,
  updateMachine,
};
