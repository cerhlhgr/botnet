const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const Promo_code = sequelize.define("promo_code", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    days_of_activate_promocode: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    days_of_promocode: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    date_for_activate_promocode_start: {type: DataTypes.DATE, allowNull: true, defaultValue: null},
    date_for_activate_promocode_end: {type: DataTypes.DATE, allowNull: true, defaultValue: null},
    discount_percent: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    currency_percent: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    used: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    active: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    user_id:{type:DataTypes.INTEGER, defaultValue:null}
})

// процент скидки
// разовая скидка

module.exports = Promo_code;