const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const organize_connections = require('./organize_connections.model')
const history_restorer = require('./history_restorer.model')
const products = require('./products.model')

const scenario = sequelize.define("scenario", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(100), foreignKey: true},
    status: {type: DataTypes.BOOLEAN, allowNull: false},
    marketplace:{type: DataTypes.STRING(100),allowNull: false}
})

scenario.hasOne(organize_connections,{at:"organize_connections", foreignKey:"scenario_id"})
scenario.hasOne(history_restorer,{at:"history_restorer", foreignKey:"scenario_id"})
// scenario.hasOne(products,{at:"products", foreignKey:"scenario_id"})
module.exports = scenario;
