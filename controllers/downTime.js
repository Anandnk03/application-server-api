const { poolPromise, db } = require('../models/index');
const sql = require('mssql');
const moment = require('moment');

const getDownTime = async (req, res) => {
  const { id } = req.params;
  try {
    const downtime = await db.sequelize.query(`PRC_GET_DOWNTIME ${id}`);

    const data = downtime[0];
    let gapData = [];
    data?.map((da) => {
      gapData.push({
        ...da,
        DownStart: moment(da.DownStart).format('YYYY-MM-DD HH:mm:ss'),
        DownEnd: moment(da.DownEnd).format('YYYY-MM-DD HH:mm:ss'),
      });
    });
    res.status(200).json({ msg: 'DownTime Fetch...', data: gapData });
    }catch (err){
    res.status(500).json({ msg: 'Server Error' });
    console.error(err);
  }
};

const getReason = async (req, res) => {
  try {
    const reason = await db.sequelize.query(`PRC_GET_NPT_REASON`);
    return res.status(200).json({ msg: 'Reason Found..', data: reason });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const updateReason = async (req, res) => {
  const value = req.body;
  
  try {
    for (let i = 0; i < value.length; i++) {
      const pool = await poolPromise;
      await pool
        .request()
        .input('pIN_reasonId', sql.Int, value[i].reasonID)
        .input('pIN_ID', sql.Int, value[i].id)
        .input('pIN_starttime', sql.NVarChar, value[i].startTime)
        .input('pIN_endtime', sql.NVarChar, value[i].endTime)
        .execute(`PRC_Update_NptREASON`);
    }
    return res.status(200).json({ msg: 'Update SuccessFully...!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const createReason = async (req, res) => {
  const { newReason, rootCause, usedOee } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('pIN_Reason', sql.VarChar(255), newReason)
      .input('pIN_RootCause', sql.VarChar(255), rootCause)
      .input('pIN_UsedOee', sql.VarChar(25), usedOee)
      .execute(`PRC_INSERT_NEWREASONMASTER`);
    return res.status(200).json({ msg: 'New Reason Add Successfully...!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};


module.exports = {
  getDownTime,
  updateReason,
  getReason,
  createReason,
};
