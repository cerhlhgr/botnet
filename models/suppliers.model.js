const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const Products = require("./products.model");

const Suppliers = sequelize.define("suppliers", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(1000), allowNull: false},
    external_name: {type: DataTypes.STRING(1000), allowNull: false},
    description: {type: DataTypes.STRING(10000), allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    place: {type: DataTypes.STRING, allowNull: false}
})

Suppliers.hasOne(Products,{as: 'products', foreignKey: 'supplier_id'});

module.exports = Suppliers;