const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const Messages = sequelize.define("messages", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    chat_id: {type: DataTypes.INTEGER, allowNull: false},
    user_id:  {type: DataTypes.INTEGER, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false},
    text: {type: DataTypes.STRING(5000), allowNull: false}
})

module.exports = Messages;