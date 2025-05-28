const sequelize = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Region = sequelize.define(
  "region",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Region;
