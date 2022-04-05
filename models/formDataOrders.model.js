const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const Payments = require("./payments.model");


const formDataOrders = sequelize.define("formDataOrders", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    url: {type: DataTypes.STRING(100), allowNull: false},
    phone: {type: DataTypes.STRING(100), allowNull: false},
})


// formDataOrders.hasOne(Payments,{as: 'payments', foreignKey: 'order_id'});
module.exports = formDataOrders;