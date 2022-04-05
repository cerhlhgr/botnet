const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const Menu = sequelize.define("menu", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    parent_id: {type: DataTypes.INTEGER, allowNull: true}
})

module.exports = Menu;