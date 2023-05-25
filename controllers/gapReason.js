const { db } = require('../models/index');
const moment = require('moment');

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

module.exports = {
  gapReason,
};
