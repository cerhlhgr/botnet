const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const Basket = require("./basket.model");
const Order_products = require("./order_products.model");
const Product_changes = require("./product_changes.model");

const Products = sequelize.define("products", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    brand: {type: DataTypes.STRING(1000), allowNull: true},
    nm_id: {type: DataTypes.STRING, allowNull: true, primaryKey:true},
    photo: {type: DataTypes.STRING(1000), allowNull: true},
    price: {type: DataTypes.FLOAT, allowNull: true},
    self_stocks: {type: DataTypes.FLOAT, allowNull: true},
    barcode: {type: DataTypes.STRING, allowNull: true},
    category_name: {type: DataTypes.STRING(1000), allowNull: true},
    commission_percent: {type: DataTypes.FLOAT, allowNull: true},
    supplier: {type: DataTypes.STRING(1000), allowNull: true},
    supply_type: {type: DataTypes.STRING(1000), allowNull: true},
    mult_of_box:{type: DataTypes.INTEGER, allowNull: true},
    tech_size:{type: DataTypes.STRING(1000), allowNull: true, primaryKey:true},
    self_price: {type: DataTypes.STRING, allowNull: true},
    md5_api_token: {type: DataTypes.STRING, allowNull: false},
    parent_id:{type: DataTypes.INTEGER, allowNull:true, defaultValue:null},
    status:{type: DataTypes.SMALLINT, allowNull:true, defaultValue:0},
    scenario_id:{type: DataTypes.INTEGER, allowNull: true},
    dead_status:{type: DataTypes.BOOLEAN, allowNull: true,defaultValue:false},
    restore_status:{type: DataTypes.BOOLEAN, allowNull: true,defaultValue:false}

})

// Products.hasOne(Basket,{as: 'basket', foreignKey: 'product_id'});
//
// Products.hasOne(Order_products,{as: 'order_products', foreignKey: 'product_id'});
//
// Products.hasMany(Product_changes,{as: 'product_changes', foreignKey: 'product_id'});

// ALTER TABLE products ADD COLUMN type text;

module.exports = Products;