const sequelize = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");


const Image = sequelize.define("image", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image_url:{
        type: DataTypes.STRING,
        allowNull: false
    },
    updated_at:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    machineId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

module.exports = Image; 