const sequelize = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Comission = sequelize.define(
  "comission",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    percent: {
      type: DataTypes.INTEGER,
    },
  },  
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Comission;
