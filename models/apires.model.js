const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const apiReq = require("./apireq.model");


const apiresModel = sequelize.define("apiRes", {
  response: {type: DataTypes.JSONB, allowNull: false},
  date: {type: DataTypes.DATE, allowNull: false}
})
module.exports = apiresModel;