const moment = require('moment');
const { poolPromise, db } = require('../models/index');
const sql = require('mssql');

const createPlan = async (req, res) => {
  const {
    date,
    endDate,
    shift,
    machine,
    product,
    password,
    manpower,
    status,
    Days,
  } = req.body;

  

  if (password != 1000 && password != 2000 && password != 3000) {
    return res.status(404).json({ msg: 'Password Incorrect!' });
  }
  if (Days < 0 || Days > 30) {
    return res.status(404).json({ msg: 'Sorry, Maximum Limit 30 Days only !' });
  }

  try {
    const pool = await poolPromise;
    const plan = await pool
      .request()
      .input('pIN_STARTDATE', sql.Date, date)
      .input('pIN_ENDDATE', sql.Date, endDate)
      .input('pIN_SHIFTNUMBER', sql.Int, shift)
      .input('pIN_MACHINEID', sql.Int, machine)
      .input('pIN_PASSCODE', sql.Int, password)
      .input('pIN_MACHINEOPERATIONID', sql.Int, product)
      .input('pIN_PLAN', sql.NVarChar(255), manpower)
      .input('pOUT_STATUS', sql.Int, status)
      .execute(`PRC_INSERT_PLAN_DETAILS`);
    const data = plan.recordset[0];
    const newData = {
      ...data,
      DATE: moment(data.DATE).format('YYYY-MM-DD'),
      STARTTIME: moment(data.STARTTIME).format('YYYY-MM-DD HH:mm:ss'),
    };
    return res
      .status(200)
      .json({ msg: 'Plan Add Successfully', data: newData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const viewPlan = async (req, res) => {
  const { id } = req.params;
  try {
    const plan = await db.sequelize.query(`PRC_GET_PLANDETAILS_RE ${id}`);
    res.status(200).json({ msg: 'Plan Founded..!', data: plan });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const update = async (req, res) => {
  const { id, manpower, date, machineId } = req.body;

  try {
    const pool = await poolPromise;
    const updatePlan = await pool
      .request()
      .input('pIN_MachineId', sql.Int, machineId)
      .input('pIN_Plan', sql.Int, manpower)
      .input('pIN_PlanID', sql.Int, id)
      .input('pIN_ShiftDate', sql.Date, date)
      .execute(`PRC_UPDATE_PLANDETAILS`);
    const dataValues = updatePlan.recordset[0];
    const newData = {
      ...dataValues,
      DATE: moment(dataValues.DATE).format('YYYY-MM-DD'),
      STARTTIME: moment(dataValues.STARTTIME).format('YYYY-MM-DD HH:mm:ss'),
    };
    return res
      .status(200)
      .json({ msg: 'Plan Update SuccessFully ', data: newData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const archive = async (req, res) => {
  const { id } = req.params;
  try {
    await db.sequelize.query(`PRC_UPDATE_DAILYSHIFTPLAN_STATUS ${id}`);
    res.status(200).json({ msg: 'Delete Plan Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'server Error' });
  }
};

module.exports = {
  createPlan,
  viewPlan,
  update,
  archive,
};
