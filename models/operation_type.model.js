const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const apiReq = require("./apireq.model");
const Products = require("./products.model");


const operationType = sequelize.define("operation_type", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    operation: {type: DataTypes.STRING(100), allowNull: false},
    description: {type: DataTypes.STRING(1000), allowNull: false}
})

operationType.hasOne(apiReq,{as: 'apiReq', foreignKey: 'op_id'});


module.exports = operationType;