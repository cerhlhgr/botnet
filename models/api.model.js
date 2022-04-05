const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const Api = sequelize.define("api", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.STRING(5000), allowNull: false}
})

module.exports = Addresses;