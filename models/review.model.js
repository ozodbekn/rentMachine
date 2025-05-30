const sequelize = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");
const User = require("./user.model");
const Machine = require("./machine.model");
const Review = sequelize.define(
    "review",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rating: {
            type: DataTypes.INTEGER,
        },
        comment: {
            type: DataTypes.STRING(100),
        },
        created_at:{
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
        },
    }
)

User.hasMany(Review);
Review.belongsTo(User);

Machine.hasMany(Review);
Review.belongsTo(Machine);

module.exports = Review;
