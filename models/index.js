'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const db = {};
const ENV = require('../data/env');

const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USER, ENV.DB_PASSWORD, {
  host: ENV.DB_HOST,
  dialect: ENV.DB_DIALECT,
  port: ENV.DB_PORT,
  dateStrings: false,
  timezone: ENV.TIMEZONE,
  // logging: ENV.APP === 'dev' ? console.log : false,
  logging: false,
  dialectOptions: {
    // Observe the need for this nested `options` field for MSSQL
    options: {
      encrypt: false,
      enableArithAbort: false,
    },
  },
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
