const sequelize = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");


const Payment = sequelize.define(
    "payment",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },payment_date:{
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
        },payment_status:{
            type: DataTypes.STRING(50),
            defaultValue: "pending",
        },amount:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },status:{
            type: DataTypes.STRING(50),
            defaultValue: "pending",
        },
        
    }
)

module.exports = Payment;
