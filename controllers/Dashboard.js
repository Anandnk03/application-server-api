const { db } = require('../models');

const Data = async (req, res) => {
  const { id, sDate, shift } = req.params;

  try {
    const liveData = await db.sequelize.query(
      sDate === undefined && shift === undefined
        ? `PRC_GET_OEE_DASHBOARDDATA '${id}' `
        : `PRC_GET_OEE_DASHBOARDDATA '${id}','${sDate}',${shift}`
    );

    if (!liveData)
      return res.status(404).json({ msg: 'LiveData Not Found..!' });
    const hourlyData = await db.sequelize.query(
      sDate === undefined && shift === undefined
        ? `PRC_GET_OEE_Hourly  '${id}' `
        : `PRC_GET_OEE_Hourly  '${id}','${sDate}',${shift}`
    );
    if (!hourlyData)
      return res.status(404).json({ msg: 'hourlyData Not Found..!' });
    const oeeData = await db.sequelize.query(
      sDate === undefined && shift === undefined
        ? `PRC_DB_OEELIVE '${id}' `
        : `PRC_DB_OEELIVE '${id}','${sDate}',${shift}`
    );
    if (!oeeData) return res.status(404).json({ msg: 'oeeData Not Found..!' });
    return res.status(200).json({
      msg: 'Dashboard Data Found..!',
      LiveData: liveData[0],
      HourlyData: hourlyData[0],
      oeeData: oeeData[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('SERVER ERROR');
  }
};

const hourlyData = async (req, res) => {
  const { id, sDate, shift } = req.params;
  try {
    const hourlyData = await db.sequelize.query(
      sDate === undefined && shift === undefined
        ? `PRC_GET_DeptWise_Hourly_Live '${id}' `
        : `PRC_GET_DeptWise_Hourly_Live '${id}','${sDate}',${shift}`
    );
    return res
      .status(200)
      .json({ msg: 'HourlyData Found..!', data: hourlyData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};
module.exports = {
  Data,
  hourlyData,
};
