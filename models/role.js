'use strict';
const { MAX } = require('mssql');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Role.init(
    {
      name: DataTypes.STRING,
      access: {
        type: DataTypes.TEXT('long'),
        set(val) {
          return Model.prototype.setDataValue.bind(this)(
            'access',
            JSON.stringify(val)
          );
        },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Role',
    }
  );
  return Role;
};
