const sequelize = require("../db");
const {DataTypes} = require("sequelize");


const Chat_members = sequelize.define("chat_members", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    chat_id: {type: DataTypes.INTEGER, allowNull: true},
    member_type: {type: DataTypes.STRING, allowNull: true},
    member_id: {type: DataTypes.INTEGER, allowNull: true}
})


module.exports = Chat_members;