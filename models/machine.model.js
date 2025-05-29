const sequelize = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");
const User = require("./user.model");

const Machine = sequelize.define(
  "machine",
  {
    name: {
      type: DataTypes.STRING(50),
    },
    price_per_hour: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING(100),
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at:{
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  min_hour:{
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  min_price:{
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
  }
);

User.hasMany(Machine);
Machine.belongsTo(User);

module.exports = Machine;
