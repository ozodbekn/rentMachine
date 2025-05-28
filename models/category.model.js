const sequelize = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Category = sequelize.define(
  "category",
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

module.exports = Category;
