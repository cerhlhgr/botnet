const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const parser_tasks = require('./parser_tasks.model')

const parser_status_tasks = sequelize.define("parser_status_tasks", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    data: {type: DataTypes.JSON, allowNull: true},
    status:{type:DataTypes.BOOLEAN, defaultValue:false}
})

module.exports = parser_status_tasks;