const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const Menu = require("./menu.model");

const Pages = sequelize.define("pages", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    alias: {type: DataTypes.STRING, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    content: {type: DataTypes.STRING(5000), allowNull: false},
    parent_id: {type: DataTypes.INTEGER, allowNull: true}
})

Pages.hasMany(Menu,{as: 'menu', foreignKey: 'page_id'});

module.exports = Pages;