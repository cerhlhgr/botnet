const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const Addresses = sequelize.define("addresses", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING(5000), allowNull: false}
})

module.exports = Addresses;