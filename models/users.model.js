const sequelize = require("../db");
const {DataTypes} = require("sequelize");
const Orders = require("./orders.model");
const Deliveries = require("./deliveries.model");
const Payments = require("./payments.model");
const Basket = require("./basket.model");
const Addresses = require("./addresses.model");
const Categories = require("./categories.model");
const Suppliers = require("./suppliers.model");
const Chat = require("./chat.model");
const Messages = require("./messages.model");
const Product_changes = require("./product_changes.model");
const Pages = require("./pages.model");
const Org_api = require('./org_api.model')
const formDataOrders = require('./formDataOrders.model')
const products = require('./products.model')
const Chat_members = require('./chat_members.model')
const organize_connections = require("./organize_connections.model");
const scenario = require("./scenario.model");
const Promo_code = require("./promo_code.model");
const apiReq = require("./apireq.model")
const parser_tasks = require('./parser_tasks.model')

const Users = sequelize.define("users", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_name: {type: DataTypes.STRING, allowNull: false},
    second_name: {type: DataTypes.STRING, allowNull: false},
    patronymic: {type: DataTypes.STRING, allowNull: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    old_email: {type: DataTypes.STRING, allowNull: true, unique: false},
    new_email: {type: DataTypes.STRING, allowNull: true, unique: true},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: "customer"},
    phone: {type: DataTypes.STRING, allowNull: true},
    token_ozon: {type: DataTypes.STRING(1000), allowNull: true},
    token_wb: {type: DataTypes.STRING(1000), allowNull: true},
    external_id: {type: DataTypes.STRING, allowNull: true},
    passport_id: {type: DataTypes.INTEGER, allowNull: true},
    birth_date: {type: DataTypes.STRING, allowNull: true},
    company_title: {type: DataTypes.STRING, allowNull: true},
    company_site: {type: DataTypes.STRING, allowNull: true},
    photo: {type: DataTypes.STRING(1000), allowNull: true}
})

// ALTER TABLE users ADD COLUMN passport_id INTEGER;
// ALTER TABLE users ADD COLUMN patronymic VARCHAR;


Users.hasOne(parser_tasks, {as: 'parser_tasks', foreignKey:'user_id'})

Users.hasOne(formDataOrders,{as: 'formDataOrders', foreignKey: 'user_id'});


Users.hasMany(Orders);
Orders.belongsTo(Users);

Users.hasMany(Deliveries,{as: 'deliveries', foreignKey: 'user_id'});

// Users.hasMany(Deliveries);
// Deliveries.belongsTo(Users);

//Users.hasOne(apiReq,{as: 'apiReq', foreignKey: 'user_id'});

Users.hasOne(Payments,{as: 'payments', foreignKey: 'user_id'});

Users.hasOne(Basket,{as: 'basket', foreignKey: 'user_id'});

// Users.hasOne(products,{as:'products', foreignKey:'user_id'})

Users.hasOne(Addresses);
Addresses.belongsTo(Users);

Users.hasOne(Messages,{as: 'messages', foreignKey: 'user_id'});

Users.hasOne(Product_changes,{as: 'product_changes', foreignKey: 'user_id'});

Users.hasMany(Org_api,{as: 'org_api', foreignKey: 'user_id'})


Users.hasOne(scenario,{as:"scenario",foreignKey:"user_id"})

Users.hasMany(Chat_members, {as: 'chat_members', foreignKey: 'memder_id'})

Users.hasMany(Promo_code, {as: 'promo_code', foreignKey: 'user_id'})

/* 
Users.hasMany(Chat, {as: 'chat', foreignKey: 'owner_id'})
 */



module.exports = Users;