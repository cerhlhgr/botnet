const cheerio = require('cheerio');
const logger = require("../services/logger")
const puppeteer = require('puppeteer')
const writer = require('./writer')
const parserDB = require('./parser_db.service')
const sendMailService = require('./sendMail.service')
require("dotenv").config();
const process = require('process');
const proxyService = require('./proxy,service')
const axios = require("axios");
const procedureService = require('./procedures.service')



class parserService
{

    async processParse()
    {
        try
        {
            this.pageNumber = 0
            this.printArr = []
            this.writeArr = []

            while (this.pageNumber < this.countPages)
            {
                await this.start()
            }
            await logger.info("Товары со страницы собраны.")

            await this.parseUr()

            await logger.info("Работа парсера завершена успешно.")
            return true
        }
        catch (err)
        {
            await logger.error("При парсинге произошла ошибка, все, что удалось собрать отправилось в parseUR(). \n текст ошибки: " + err)
            await this.parseUr()
            return false
        }

    }

    async setUrl(url, urArr, countPages, reportData, task_id)
    {
        this.task_id = task_id
        this.url = url
        this.urArr = urArr
        this.countPages = +countPages

        const time = new Date()
        const hh = time.getHours(); // Часы
        const mm = time.getMinutes(); // минуты
        const ss = time.getSeconds(); // секунды

        this.dateStart = `${time.toISOString().substring(0, 10)}-${hh+"-"+ mm}` //формирование названия файла логгов юр.лиц

        await procedureService.set(reportData)
    }

    async pagination()
    {
        this.pageNumber++;
        await logger.info("Номер страницы: " + this.pageNumber)
        return this.url + "&page="+this.pageNumber
    }



    async start()
    {
        try
        {
            if(this.pageNumber >= this.countPages)
            {
               // await this.parseUr()
                await logger.info("Работа парсера завершена успешно, данные записаны в файл.")
                this.pageNumber  = 0;
                this.errorTry = 50;
                return true
            }

            let url = await this.pagination(this.url)

            let content = await procedureService.getContent(url)

            if(!content)
                return false

            let resTree = await cheerio.load(content);


            resTree('._2UHry._1Oi8a').each((i,m) =>
            {
                this.printArr.push({product:resTree(m).text().trim(),  url:"https://market.yandex.ru" + resTree(m).find('a').attr('href').trim()})
            })


            resTree('._2UHry._2vVOc').each((i,m) =>
            {
                this.printArr.push({product:resTree(m).text().trim(), url:"https://market.yandex.ru" + resTree(m).find('a').attr('href').trim()})

            })

        }
        catch (err)
        {
            await logger.fatal("Ошибка запроса : " + err)
            this.pageNumber--
        }
    }



    async sleep(ms)
    {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    async parseUr()
    {
        try
        {
            await logger.warn("Всего элементов на странице: " + this.printArr.length);

            for(let i = 0; i < this.printArr.length;i++)
            {

                // if(i > 1 )
                //     return true   тестирование

                await logger.warn('Текущий элемент: ' + (+i+1) + "\n Осталось: " + (+this.printArr.length-1-i))

                let item = this.printArr[i]

                let content = await procedureService.getContent(item.url)

                if(!content)
                {
                    await logger.error("Произошла, был выполнен continue, строчка - 136")
                    continue
                }

                let resTree = await cheerio.load(content);

                const company = resTree('.Vu-M2').text().trim()

                if (company)
                {
                    if (!await this.checkUrInArr(company))
                    {
                        await procedureService.getContent(item.url, true)

                        if (resTree('.I7X9U.odzxI._3lbcP').find("a").attr('href'))
                        {
                            let urlTo = "https://market.yandex.ru" + resTree('.I7X9U.odzxI._3lbcP').find("a").attr('href')
                            let contentTo = await procedureService.getContent(urlTo)

                            if(!contentTo)
                            {
                                await logger.error("Произошла, был выполнен continue, строчка - 156")
                                continue
                            }

                            let infoTree = await cheerio.load(contentTo)

                            let urlUr = "https://market.yandex.ru" + infoTree('._2AMPZ._2reIv._1ghok.JYmK_._1BsVs._2X16L._1Wmkm._1XCUK').attr('href')

                            if (urlUr)
                            {
                                let contentUr = await procedureService.getContent(urlUr.replace('/express', '') + "/info")

                                if(!contentUr)
                                {
                                    await logger.error("Произошла, был выполнен continue, строчка - 171")
                                    continue
                                }

                                let infoUR = await cheerio.load(contentUr)

                                let str = ''

                                infoUR("._1dYd9").eq(0).find('._2iK1L').each(async (i, em) => {

                                    if (infoUR("._1dYd9").eq(0).find(em).text().trim() != "Показать телефон" && infoUR("._1dYd9").eq(0).find(em).text().trim() != "Вернуть товар надлежащего качества можно в течение 7 дней после покупки.")
                                        str = str + infoUR("._1dYd9").eq(0).find(em).text().trim() + ' '

                                })

                                const data = {
                                    status:true,
                                    data:{product: item.product, url: item.url, ur: str ? str : "Не указано"},
                                    task_id:this.task_id
                                }

                                this.last_id = await parserDB.create_status_task(data)


                                this.writeArr.push({product: item.product, url: item.url, ur: str ? str : "Не указано"})
                                await writer.csvFromat(this.writeArr, this.dateStart)
                            }
                            else
                            {
                                const text = encodeURIComponent('@SMedvedevskikh , Yandex сменили селекторы на получение юр. лиц строка: 322')
                                await axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_KEY}/sendMessage?chat_id=-${process.env.CHAT_ID}&disable_web_page_preview=1&text=${text}`)
                            }
                        }
                    }
                    else
                    {
                        await logger.warn("Компания из белого списка: " + resTree('.Vu-M2').text().trim())
                    }
                }
                else
                {
                    await logger.warn("Не удалось получить компанию.")
                }


                await this.sleep(2000)

            }
        }
        catch (err)
        {
            await logger.fatal(err)
        }
    }


    async checkUrInArr(str)
    {
        try
        {
            for (let i = 0; i < this.urArr.length; i++)
            {
                let item = this.urArr[i]

                await logger.info(this.urArr[i])
                await logger.info(str)
                await logger.info(item === str)

                if (item.toLowerCase() === str.toLowerCase())
                    return true
            }

            return false
        }
        catch (err)
        {
            await logger.error("parser: checkUrInArr - " + err)
            return false
        }
    }




}

module.exports = new parserService()
