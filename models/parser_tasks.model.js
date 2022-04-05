const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const parser_status_tasks = require('./parser_status_tasks.model')

const parser_tasks = sequelize.define("parser_tasks", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    task: {type: DataTypes.JSON, allowNull: false},
    user_id:{type:DataTypes.INTEGER, allowNull: true, foreignKey:true}

})

parser_tasks.hasMany(parser_status_tasks, {as:'parser_status_tasks', foreignKey:'task_id'})
module.exports = parser_tasks;