const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const users = require("./users.model");
const apiRes = require("./apires.model");

const apiReq = sequelize.define("apiReq", {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  request: {type: DataTypes.JSONB, allowNull: false},
  date: {type: DataTypes.DATE, allowNull: false},
  status: {type: DataTypes.BOOLEAN, allowNull: false, default:false},
  op_id:{type:DataTypes.INTEGER, foreignKey:true}
})

apiReq.hasOne(apiRes,{as: 'apiRes', foreignKey: 'req_id'});

module.exports = apiReq;