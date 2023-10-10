const { db } = require('../models');

const viewStatus = async (req, res) => {
  try {
    const status = await db.sequelize.query('Get_CommStatus');
    const time = await db.sequelize.query('PRC_STATUS_MACHINE');

    let ArrayData = [];
    status[0].map((da) => {
      const filterData = time[0].filter(
        (item) => item.machineid === da.MachineID
      );
      ArrayData.push({
        ...da,
        filterData: filterData[0],
      });
    });

    res.status(200).json({ msg: 'Scope Founded...', data: ArrayData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = {
  viewStatus,
};
