const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const Orders = require("./orders.model");
const Addresses = require("./addresses.model");

const Deliveries = sequelize.define("deliveries", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    order_id: {type: DataTypes.INTEGER, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false},
    total: {type: DataTypes.FLOAT, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING(1000), allowNull: false}
})

// Deliveries.hasOne(Orders,{as: 'orders', foreignKey: 'delivery_id'});

// Deliveries.hasOne(Orders);
// Orders.belongsTo(Deliveries);

Deliveries.hasOne(Addresses,{as: 'addresses', foreignKey: 'delivery_id'});

module.exports = Deliveries;