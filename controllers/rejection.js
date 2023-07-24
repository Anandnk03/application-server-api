const { poolPromise, db } = require('../models/index');
const moment = require('moment');
const sql = require('mssql');

const rejectionView = async (req, res) => {
  const { id } = req.params;

  try {
    const rejection = await db.sequelize.query(`PRC_GET_NC_LIST ${id}`);
    res.status(200).json({ msg: 'Rejection Found..!', data: rejection });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const addNcQty = async (req, res) => {
  const { shiftDataId, updateNc } = req.body;

  try {
    const pool = await poolPromise;
    const ncQty = await pool
      .request()
      .input('pIn_ShiftDataID', sql.Int, shiftDataId)
      .input('pIn_AddNCQty', sql.Int, updateNc)
      .execute(`PRC_ADD_NC_QTY`);
    const data = ncQty.recordset[0];
    const newData = {
      ...data,
      ShiftDate: moment(data.ShiftDate).format('YYYY-MM-DD HH:mm:ss'),
    };
    res
      .status(200)
      .json({ msg: 'Nc Qty Update SuccessFully ...!', data: newData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const NCReasonCategories = async (req, res) => {
  try {
    const Category = await db.sequelize.query(
      'Select * From E2M_NCReasons_Category_M'
    );
    res.status(200).json({ msg: ' Category Found..!', data: Category[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const createNewReason = async (req, res) => {
  const { ActionId, CategoryID, MachineID, newReason } = req.body;

  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('pIn_ReasonType', sql.Int, ActionId)
      .input('pIn_MachineID', sql.Int, MachineID)
      .input('pIn_ReasonCategoryID', sql.Int, CategoryID)
      .input('pIn_Reason', sql.VarChar(250), newReason)
      .execute(`PRC_Insert_NCReason`);
    res.status(200).json({ msg: 'Your Reason Add Successfully...!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const viewReason = async (req, res) => {
  const { machineId, reasonType } = req.params;

  try {
    const reason = await db.sequelize.query(
      `PRC_Get_NCReasons_List ${reasonType},${machineId}`
    );

    res.status(200).json({ msg: 'Reason Found..!', data: reason[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const updateReason = async (req, res) => {
  const { shiftDataID, NcClearQty, ReasonId, CreateBy } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('pIn_ShiftDataID', sql.Int, shiftDataID)
      .input('pIn_NCClearedQty', sql.Int, NcClearQty)
      .input('pIn_NCReasonID', sql.Int, ReasonId)
      .input('pIn_CreatedBy', sql.VarChar(250), CreateBy)
      .execute(`PRC_Update_NCQty_Reason`);
    res.status(200).json({ msg: 'Your Reason Update Successfully...!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = {
  rejectionView,
  addNcQty,
  NCReasonCategories,
  createNewReason,
  viewReason,
  updateReason,
};
