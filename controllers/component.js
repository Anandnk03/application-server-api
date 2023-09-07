const moment = require('moment');
const { poolPromise, db } = require('../models/index');
const sql = require('mssql');


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
   
    return res
      .status(200)
      .json({ msg: 'Component Add Successfully'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};


const updateComponent = async(req,res)=>{
     
  const {ComponentId,ComponentName,ComponentNumber} = req.body;
  try {
    const pool = await poolPromise;
    const componentData = await pool
      .request()
      .input('pIN_ComponentId',sql.Int,ComponentId)
      .input('pIN_ComponentName',sql.NVarChar(255),ComponentName)
      .input('pIN_ComponentNumber',sql.NVarChar(255),ComponentNumber)
      .execute('PRC_Update_Component');
   
    return res
      .status(200)
      .json({ msg: 'Component Update Successfully'});
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }

  }

  
module.exports = {
  addComponent,
  updateComponent,

};
