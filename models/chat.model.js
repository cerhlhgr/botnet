const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const Messages = require("./messages.model");

const Chat = sequelize.define("chat", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    order_products_id: {type: DataTypes.INTEGER, allowNull: false},
    owner_id: {type: DataTypes.INTEGER, allowNull: true},
    group: {type: DataTypes.BOOLEAN, allowNull: true},
    status: {type: DataTypes.STRING, allowNull: false},
    admin: {type: DataTypes.BOOLEAN, allowNull: false},
    supplier: {type: DataTypes.BOOLEAN, allowNull: false},
    user: {type: DataTypes.BOOLEAN, allowNull: false},
    courier: {type: DataTypes.BOOLEAN, allowNull: false},
    stockman: {type: DataTypes.BOOLEAN, allowNull: false},
    support: {type: DataTypes.BOOLEAN, allowNull: false}
})


module.exports = Chat;