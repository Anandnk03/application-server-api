const { poolPromise, db } = require('../models/index');
const moment = require('moment');
const sql = require('mssql');

const gapReason = async (req, res) => {
  const { id } = req.params;
  try {
    const gap = await db.sequelize.query(`PRC_GET_GAPLIST ${id}`);
    const data = gap[0];
    let gapData = [];
    data.map((da) => {
      gapData.push({
        ...da,
        HOURSTARTTIME: moment(da.HOURSTARTTIME).format('HH:mm:ss'),
        HOURENDTIME: moment(da.HOURENDTIME).format('HH:mm:ss'),
      });
    });
    res.status(200).json({ msg: 'Gap Reason Found..!', data: gapData });
  } catch (error) {
    console.log(error);
    res.status(200).json({ msg: 'Server Error' });
  }
};

const createReason = async (req, res) => {
  const value = req.body;
  console.log(value);
  try {
    for (let i = 0; i < value.length; i++) {
      const pool = await poolPromise;
      await pool
        .request()
        .input('pIn_HourlyShiftID', sql.Int, value[i].hourlyId)
        .input('pIn_GapReasonID', sql.Int, value[i].reasonId)
        .input('pIn_MID', sql.Int, value[i].Mid)
        .input('pIn_LossTime', sql.VarChar(255), value[i].lossTime)
        .input('pIn_CreatedBy', sql.VarChar(255), value[i].CreateBy)
        .execute(`PRC_INSERT_HOURLYSHIFT_GAPREASON`);
    }
    return res.status(200).json({ msg: 'Reason Update Successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send('SERVER ERROR');
  }
};

module.exports = {
  gapReason,
  createReason,
};
