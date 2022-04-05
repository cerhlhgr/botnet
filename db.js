const {Sequelize} = require("sequelize");
const config = require('./config/config.json');
const logger = require("./services/logger");

require("dotenv").config();

async function checkConnection(res)
{
    try {
        await res.authenticate()
        await logger.info("Connected to DB")

    }
    catch (e)
    {
        await logger.fatal(e)
    }
}

let res = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: "postgres",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            freezeTableName: true
        }
    }
)

checkConnection(res)

module.exports = res