const logger = require("../services/logger")
const puppeteerService = require('./puppeteer.service')
const cheerio = require("cheerio");


class proceduresService
{
    error_try = 50

    async set( reportData)
    {
        await puppeteerService.setConfig(reportData)
    }

    async getContent(url,report = false, companies = false)
    {
        try
        {
            let content   //Переменная содержащая контент из запроса

            if(this.error_try == 0)
                return false

            content = await puppeteerService.exec(url,report, companies)

            while(!content)
            {
                content = await puppeteerService.exec(url,report, companies)
                this.error_try--
            }

            let resTree = await cheerio.load(content);

            while(resTree('.Text.Text_weight_medium.Text_typography_headline-s').eq(0).text() == 'Подтвердите, что запросы отправляли вы, а не робот' || resTree('.content__h1').eq(0).text() == 'Доступ к нашему сервису временно запрещён!')
            {
                content =  await puppeteerService.exec(url,report, companies)
                resTree = await cheerio.load(content);
                this.error_try--
            }

            return content

        }
        catch (err)
        {

            if(this.error_try == 0)
                return false

            this.error_try--

            await logger.error('class proceduresService - getContent : ' + err)

        }
    }
}

module.exports = new proceduresService()