const amqp = require('amqplib');
const logger = require('./services/logger')
// const parserControllerYM = require('./controllers/parserYM.controller')
const {data} = require("cheerio/lib/api/attributes");
const sequelize = require("./db");
 const parserControllerYM = require("./controllers/parserYM.controller");

require("dotenv").config();

async function recive()
{
    try {
        await sequelize.authenticate();
        await sequelize.sync();
         const q = `parser_req`;

        await logger.info("Current queue: " + q)

        const connection = await amqp.connect(`amqp://${process.env.RABBIT_LOGIN}:${process.env.RABBIT_PASSWORD}@${process.env.RABBIT_HOST}`);

        if(connection)
            await logger.info("The connection to the queued server was successful.")

        const ch = await connection.createChannel();

        const ok = await ch.assertQueue(q, {durable: true});

        await ch.prefetch(1)

        const res = await ch.consume(q, async (msg) => {

            const dataString = msg.content.toString()

            const dataJson = JSON.parse(dataString)

            if(dataJson.type === "complaints")
            {
                // const parserControllerYM = require('./controllers/parserYM.controller')
                // await parserControllerYM.startParse(dataJson)
                await callController(dataJson)
                await ch.ack(msg)
            }

            // if(dataJson.type === "get_companies")
            // {
            //      let res = await parserControllerYM.getCompanies(dataJson.url)
            //
            //     const resSend =  ch.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(res)), {
            //         correlationId:msg.properties.correlationId ? msg.properties.correlationId : null
            //     });
            // }
            //       const res = await createRes.create(dataJson)


        },{ noAck : false});


    }
    catch (err)
    {
        await logger.fatal("recive error: " + err)
    }
}


async function callController(dataJson)
{
    try {
        await parserControllerYM.startParse(dataJson)

        await logger.info("Вызов контроллера завершен.")
    }
    catch(err)
    {
        await logger.error('callController - ' + err)
        return false
    }
}

const result =  recive();
