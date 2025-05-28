const sequelize = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");
const User = require("./user.model");

const UserAdress = sequelize.define(
  "userAdress",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(100),
    },
  },
  {
    freezeTableName: true,
  }
);

User.hasMany(UserAdress);
UserAdress.belongsTo(User);

module.exports = UserAdress;
