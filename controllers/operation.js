const moment = require('moment');
const { poolPromise, db } = require('../models/index');
const sql = require('mssql');

const addOperation = async(req,res)=>{

    const{componentName,operationNumber,operationName} = req.body;
    console.log(req.body);

    try {
        const pool = await poolPromise;
        const componentData = await pool
          .request()
          .input('pIN_ComponentId',sql.Int,componentName)
          .input('pIN_OperationName',sql.NVarChar(255),operationName)
          .input('pIN_OperationNumber',sql.NVarChar(50),operationNumber)
          .execute(`PRC_Insert_Operation_Data`);
       
        return res
          .status(200)
          .json({ msg: 'Operation Add Successfully'});
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error' });
      }
    };

    const updateOperation = async(req,res)=>{
     
      const {OperationId,OperationName,OperationNumber} = req.body;
      try {
        const pool = await poolPromise;
        const operationData = await pool
          .request()
          .input('pIN_OperationId',sql.Int,OperationId)
          .input('pIN_OperationName',sql.NVarChar(255),OperationName)
          .input('pIN_OperationNumber',sql.NVarChar(255),OperationNumber)
          .execute('PRC_Update_Operation');
       
        return res
          .status(200)
          .json({ msg: 'Operation Update Successfully'});
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error' });
      }
    
      }

    
module.exports = {
    addOperation,
    updateOperation 
  };
