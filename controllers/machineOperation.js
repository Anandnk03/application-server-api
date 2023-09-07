const moment = require('moment');
const { poolPromise, db } = require('../models/index');
const sql = require('mssql');

const addmachineOperation = async (req, res) => {
    const {componentName,operationName,machineName,perhourOutput,toct,cycleTime,createBy} = req.body;
  
    console.log(req.body);
  
    try {
      const pool = await poolPromise;
      const machineOperationData = await pool
        .request()
        .input('pIN_ComponentId',sql.Int,componentName)
        .input('pIN_OperationId',sql.Int,operationName)
        .input('pIN_MachineId',sql.Int,machineName)
        .input('CreateBy',sql.VarChar,createBy)
        .input('pIN_Toct',sql.Int,toct)
        .input('pIN_Output_PerHour',sql.Int,perhourOutput)
        .input('pIN_CycleTime',sql.Int,cycleTime)
        .execute('PRC_Insert_MachineOperation_Data');
     
      return res
        .status(200)
        .json({ msg: 'MachineOperation Add Successfully'});
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Server Error' });
    }
  };
  
  const updateMachineOperation = async(req,res)=>{
     
    const {Id,MachineName,Toct,PerhourOutput,CycleTime} = req.body;
    try {
      const pool = await poolPromise;
      const MachineOperationData = await pool
        .request()
        .input('pIN_Id',sql.Int,Id)
        .input('pIN_MachineName',sql.NVarChar(255),MachineName)
        .input('Toct',sql.Int,Toct)
        .input('OutputPerhour',sql.Int,PerhourOutput)
        .input('CycleTime',sql.Int,CycleTime)
        .execute('PRC_Update_MachineOperation');
     
      return res
        .status(200)
        .json({ msg: 'Machine Operation Update Successfully'});
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Server Error' });
    }
  }


  module.exports= {
    addmachineOperation,
    updateMachineOperation,
  }