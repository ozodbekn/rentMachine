const sequelize = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");
const User = require("./user.model");
const Role = require("./roles.model");

const UserRole = sequelize.define(
  "user_role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

// Many-to-many asosatsiya
User.belongsToMany(Role, { through: UserRole, foreignKey: "userId" });
Role.belongsToMany(User, { through: UserRole, foreignKey: "roleId" });

// Eager loading uchun asosatsiyalar (MUHIM!)
UserRole.belongsTo(User, { foreignKey: "userId" });
UserRole.belongsTo(Role, { foreignKey: "roleId" });

module.exports = UserRole;
