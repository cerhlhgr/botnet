const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const Order_products = require("./order_products.model");

const Product_changes = sequelize.define("product_changes", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    order_products_id: {type: DataTypes.INTEGER, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false},
    amount: {type: DataTypes.INTEGER, allowNull: false},
    price: {type: DataTypes.FLOAT, allowNull: false},
    size: {type: DataTypes.STRING, allowNull: false},
    color: {type: DataTypes.STRING, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: true}
})

Product_changes.hasMany(Order_products,{as: 'order_products', foreignKey: 'user_id', targetKey: 'user_id'});

// ALTER TABLE product_changes ADD COLUMN type text;

module.exports = Product_changes;