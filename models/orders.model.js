const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const Payments = require("./payments.model");
const Addresses = require("./addresses.model");
const Order_products = require("./order_products.model");
const Product_changes = require("./product_changes.model");

const Orders = sequelize.define("orders", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    total: {type: DataTypes.FLOAT, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false},
    payment: {type: DataTypes.STRING(1000), allowNull: false},
    delivery_id: {type: DataTypes.INTEGER, allowNull: false}
})

//Orders.hasOne(Payments,{as: 'payments', foreignKey: 'order_id'});
Orders.hasOne(Addresses,{as: 'addresses', foreignKey: 'order_id'});
Orders.hasOne(Order_products,{as: 'order_products', foreignKey: 'order_id'});
Orders.hasMany(Product_changes,{as: 'product_changes', foreignKey: 'order_id'});

// Users.hasMany(Reports);
// Reports.belongsTo(Users);

// Users.hasMany(Report_lists);
// Report_lists.belongsTo(Users);

// Users.hasMany(Payments);
// Payments.belongsTo(Users);

// Users.hasMany(History);
// History.belongsTo(Users);

module.exports = Orders;