const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const history_restorer = sequelize.define("history_restorer", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nm_id: {type: DataTypes.INTEGER,allowNull: true},
    product_name:{type: DataTypes.STRING(300),allowNull: true},
    restorer_nm_id: {type: DataTypes.INTEGER,allowNull: true},
    status:{type: DataTypes.INTEGER,allowNull: true},
    photo:{type: DataTypes.STRING,allowNull: true}
})

module.exports = history_restorer;
