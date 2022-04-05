const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const Order_products = sequelize.define("order_products", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.STRING, allowNull: false},
    amount: {type: DataTypes.INTEGER, allowNull: false},
    price: {type: DataTypes.FLOAT, allowNull: false},
    total: {type: DataTypes.FLOAT, allowNull: false},
    size: {type: DataTypes.STRING, allowNull: false},
    color: {type: DataTypes.STRING, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: true}
})

// ALTER TABLE order_products ADD COLUMN type text;

module.exports = Order_products;