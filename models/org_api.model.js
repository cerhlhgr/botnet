const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const organize_connections = require("./organize_connections.model");


const Org_api = sequelize.define("org_api", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    company_title: {type: DataTypes.STRING(1000), allowNull: false},
    market_place_title: {type: DataTypes.STRING(1000), allowNull: false},
    shop_title: {type: DataTypes.STRING(10000), allowNull: false},
    key_code: {type: DataTypes.STRING, allowNull: false},
    md5_api_token: {type: DataTypes.STRING, allowNull: false},
    client_id: {type: DataTypes.STRING, allowNull: true},
    phone: {type: DataTypes.STRING, allowNull: true},
    key_code_full:{type: DataTypes.STRING, allowNull: false},
})
// Org_api.hasMany(organize_connections,{at:"organize_connections", foreignKey:"md5_api_token"})
Org_api.hasOne(organize_connections,{as: 'organize_connections', foreignKey: 'org_api_id'});
// //Org_api.hasOne(organize_connections,{as: 'organize_connections', foreignKey: 'to_md5_api_token'});
// Org_api.hasMany(organize_connections,{as: 'organize_connections', foreignKey: 'to_md5_api_token'})
module.exports = Org_api;
