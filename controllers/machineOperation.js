const { poolPromise, db } = require('../models/index');
const sql = require('mssql');

const addmachineOperation = async (req, res) => {
  const {
    componentName,
    operationName,
    machineName,
    programId,
    quantityPerCycle,
    perhourOutput,
    toct,
    cycleTime,
    createBy,
  } = req.body;

  try {
    const pool = await poolPromise;
    const machineOperationData = await pool
      .request()
      .input('pIN_ComponentNumber', sql.Int, componentName)
      .input('pIN_OperationNumber', sql.Int, operationName)
      .input('pIN_MachineId', sql.Int, machineName)
      .input('pIN_ProgramId', sql.VarChar, programId)
      .input('pIN_QuantityPerCycle', sql.Int, quantityPerCycle)
      .input('pIN_CreateBy', sql.VarChar, createBy)
      .input('pIN_Toct', sql.Int, toct)
      .input('pIN_OutHours', sql.Int, perhourOutput)
      .input('pIN_CycleTime', sql.Int, cycleTime)
      .execute('PRC_Insert_MachineOperation');
    const data = machineOperationData.recordset;

    return res
      .status(200)
      .json({ msg: 'Product Added Successfully', data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const updateMachineOperation = async (req, res) => {
  const { Id, ProgramId, QuantityPerCycle, Toct, PerhourOutput, CycleTime } =
    req.body;

  try {
    const pool = await poolPromise;
    const MachineOperationupdateData = await pool
      .request()
      .input('pIN_Id', sql.Int, Id)
      .input('pIN_ProgramId', sql.NVarChar, ProgramId)
      .input('pIN_QuantityPerCycle', sql.Int, QuantityPerCycle)
      .input('pIN_Toct', sql.Int, Toct)
      .input('pIN_OutputPerhour', sql.Int, PerhourOutput)
      .input('pIN_CycleTime', sql.Int, CycleTime)
      .execute('PRC_Update_MachineOperation');
    const data = MachineOperationupdateData.recordset[0];

    return res
      .status(200)
      .json({ msg: 'Machine Operation Update Successfully', data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = {
  addmachineOperation,
  updateMachineOperation,
};
