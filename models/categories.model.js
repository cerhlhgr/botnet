const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const Products = require("./products.model");

const Categories = sequelize.define("categories", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    parent_id: {type: DataTypes.INTEGER, allowNull: true},
    title: {type: DataTypes.STRING(1000), allowNull: false},
    description: {type: DataTypes.STRING(10000), allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    public: {type: DataTypes.BOOLEAN, allowNull: false}
})

//Categories.hasOne(Products,{as: 'products', foreignKey: 'category_id'});

module.exports = Categories;