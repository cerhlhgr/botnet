const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const history_restorer = require("./history_restorer.model")

const organize_connections = sequelize.define("organize_connections", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    migrate_org_api_id: {type: DataTypes.INTEGER, foreignKey: true},
    step: {type: DataTypes.INTEGER,  allowNull: true},
    restore: {type: DataTypes.BOOLEAN, allowNull: false}
})


organize_connections.hasOne(history_restorer,{at:"history_restorer", foreignKey:"org_id"})

module.exports = organize_connections;
