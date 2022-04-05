const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const Basket = sequelize.define("basket", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    amount: {type: DataTypes.INTEGER, allowNull: false},
    price: {type: DataTypes.FLOAT, allowNull: false},
    total: {type: DataTypes.FLOAT, allowNull: false}
})

module.exports = Basket;