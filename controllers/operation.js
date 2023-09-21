const moment = require('moment');
const { poolPromise, db } = require('../models/index');
const sql = require('mssql');

const addOperation = async(req,res)=>{

    const{componentId,operationNumber,operationName} = req.body;
    
    try {
        const pool = await poolPromise;
        const operationData= await pool
          .request()
          .input('pIN_ComponentId',sql.Int,Number(componentId))
          .input('pIN_OperationName',sql.NVarChar(255),operationName)
          .input('pIN_OperationNumber',sql.NVarChar(50),operationNumber)
          .execute(`PRC_Insert_Operation_Data`);
        
          const data = operationData.recordset
         
          
        return res
          .status(200)
          .json({ msg: 'Operation Add Successfully',data:data});
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error' });
      }
    };

    const updateOperation = async(req,res)=>{
     
      const {OperationId,OperationName,OperationNumber} = req.body;
      try {
        const pool = await poolPromise;
        const operationUpdateData = await pool
          .request()
          .input('pIN_OperationId',sql.Int,OperationId)
          .input('pIN_OperationName',sql.NVarChar(255),OperationName)
          .input('pIN_OperationNumber',sql.NVarChar(255),OperationNumber)
          .execute('PRC_Update_Operation');
          const data = operationUpdateData.recordset[0]
   
       
        return res
          .status(200)
          .json({ msg: 'Operation Update Successfully',data:data});
      } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error' });
      }
    
      }

    
module.exports = {
    addOperation,
    updateOperation 
  };
