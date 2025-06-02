const sequelize = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");
const User = require("./user.model");
const Machine = require("./machine.model");
const Status = require("./status.model");
const Contract = sequelize.define(
  "contract",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total_price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    date: {
      type: DataTypes.STRING,
    },
    start_time: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    end_time: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    total_time: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { timestamps: false }
);

User.hasMany(Contract);
Contract.belongsTo(User);

Machine.hasMany(Contract);
Contract.belongsTo(Machine);

Status.hasMany(Contract);
Contract.belongsTo(Status);

module.exports = Contract;
