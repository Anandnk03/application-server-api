const moment = require('moment');
const { poolPromise, db } = require('../models/index');
const sql = require('mssql');
const { constant } = require('async');


const addComponent= async (req, res) => {
  const {componentNumber,componentName,createBy} = req.body;

  try {
    const pool = await poolPromise;
    const componentData = await pool
      .request()
      .input('pIN_ComponentNumber',sql.NVarChar(255),componentNumber)
      .input('pIN_ComponentName',sql.NVarChar(255),componentName)
      .input('pIN_CreateBy',sql.VarChar(50),createBy)
      .execute(`PRC_Insert_ComponentData`);
      const Data = componentData.recordset
     console.log("Data",Data)
    return res
      .status(200)
      .json({ msg: 'Component Add Successfully',data:Data});
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};


const updateComponent = async(req,res)=>{
     
  const {ComponentId,ComponentName,ComponentNumber} = req.body;
  try {
    const pool = await poolPromise;
    const componentupdateData = await pool
      .request()
      .input('pIN_ComponentId',sql.Int,ComponentId)
      .input('pIN_ComponentName',sql.NVarChar(255),ComponentName)
      .input('pIN_ComponentNumber',sql.NVarChar(255),ComponentNumber)
      .execute('PRC_Update_Component');

      const data = componentupdateData.recordset[0]
    
    return res
      .status(200)
      .json({ msg: 'Component Update Successfully',data:data});
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }

  }

  
module.exports = {
  addComponent,
  updateComponent,

};
