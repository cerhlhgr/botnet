const sequelize = require("../db");
const {DataTypes} = require("sequelize");


const LegalEntity = sequelize.define("legalentity", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id:  {type: DataTypes.INTEGER},
    type_company: {type: DataTypes.STRING, allowNull: true},
    title: {type: DataTypes.STRING, allowNull: true},
    ogrn: {type: DataTypes.STRING, allowNull: true},
    oklo: {type: DataTypes.STRING, allowNull: true},
    inn: {type: DataTypes.STRING, allowNull: true},
    kpp: {type: DataTypes.STRING, allowNull: true},
    vat_payer: {type: DataTypes.STRING, allowNull: true},
    name: {type: DataTypes.STRING, allowNull: true},
    last_name: {type: DataTypes.STRING, allowNull: true},
    patronymic: {type: DataTypes.STRING, allowNull: true}
})


module.exports = LegalEntity;