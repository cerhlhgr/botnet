const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const Deliveries = require("./deliveries.model");
const scenario = require("./scenario.model")
const Payments = sequelize.define("payments", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false},
    region: {type: DataTypes.STRING, allowNull: false},
    total: {type: DataTypes.FLOAT, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false}
})

Payments.hasOne(Deliveries,{as: 'deliveries', foreignKey: 'payment_id'})
Payments.hasOne(scenario,{as: 'scenario', foreignKey: 'order_id'})
// Payments.hasOne(Deliveries);
// Deliveries.belongsTo(Payments);

// Users.hasMany(Deliveries);
// Deliveries.belongsTo(Users);

module.exports = Payments;