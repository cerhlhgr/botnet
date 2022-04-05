const nodemailer = require('nodemailer')
const logger = require('./logger')

class sendMailService
{

    async send(dataObject) {
        try {


            const transporter = nodemailer.createTransport({
                service: 'Yandex',
                secure: false,
                auth: {
                    user: '',
                    pass: ''
                }
            })

            const mailOptions = {
                from: '<no-reply@seed-x-ceed.com>',
                to: dataObject.email,
                subject: `Жалоба на товар отправлена`,
                body: "BODY",
                html: `<h2>Жалоба отправлена на товар ${dataObject.product}</h2>
                    <hr>
                   <h3>Данные товара: </h3>
                   <p>url: ${dataObject.url}</p>
                   <p>Юр. лицо: ${dataObject.ur} </p>`

            };

            await transporter.sendMail(mailOptions)
        }
        catch (err)
        {
            await logger.error("При отправке письма произошла ошибка: " + err)
        }
    }



}

module.exports = new sendMailService()
