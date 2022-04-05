const logger = require("../services/logger")
const proxyService = require('./proxy,service')
const axios = require("axios");
const process = require('process');
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const parserDB = require("./parser_db.service");
require("dotenv").config();

class puppeteerService
{

    async setConfig(reportData)
    {
        this.reportData = reportData

        if(process.env.PROXY_STYLE=="LIST")
        {
            await this.proxyGet()
        }
    }

    async proxyGet()
    {
        const proxy = await proxyService.get()

        this.proxyList = proxy.data
        this.proxyLen = proxy.len
        this.proxyIterator = 0

    }

    async exec(url, report = false, companies = false, takeUr = false)
    {
        try
        {

            await logger.info("URL: " + url)

            let page

            if(process.env.PROXY_STYLE=="API")
            {
                this.browser = await puppeteer.launch({
                    headless: true,
                    args: ['--proxy-server='+process.env.PROXY_API_ADDRESS]

                });


                page = await this.browser.newPage();

                await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

                await page.authenticate({
                    username: process.env.PROXY_LOGIN,
                    password: process.env.PROXY_PASSWORD
                });
            }

            if(process.env.PROXY_STYLE=="LIST")
            {

                if(this.proxyIterator == this.proxyLen || this.proxyIterator >= 100)
                {
                    await this.proxyGet()
                }

                this.browser = await puppeteer.launch({
                    headless: true,
                    args: ['--proxy-server=socks5://'+this.proxyList[this.proxyIterator]]
                });

                await logger.info('Итератор: ' + this.proxyIterator + " Используемый адресс: " + this.proxyList[this.proxyIterator])

                this.proxyIterator++;

                page = await this.browser.newPage();

                await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

            }

            await page.goto(url);

            let content = await page.content();

            let resTree = await cheerio.load(content);

            if(!report && !companies && !takeUr)
                await this.browser.close();

            if(companies)
            {
                await page.click('._1KpjX._2Wg9r')
                content = await page.content();
            }

            if(report)
            {

                await page.click('._2OrFh')

                let el = await page.$$('._1-id8')

                for(let i = 0; i < el.length; i++)
                {

                    if (await (await el[i].getProperty('innerText')).jsonValue() == this.reportData.what_matter)
                    {
                        await el[i].click()
                    }

                }

                let reason = await page.$$('.cUeQO')

                for(let i = 0;i < reason.length; i++)
                {

                    if (await (await reason[i].getProperty('innerText')).jsonValue() == this.reportData.reason)
                    {
                        await reason[i].click()

                        let button = await page.$$('.zsSJk._16jAB._36y1j.UT07R._1-J09')

                        for(let j = 0; j < button.length; j++)
                        {
                            await button[j].click()
                        }

                    }
                }

                try
                {
                    await page.type('textarea', this.reportData.desc_problem)

                    await page.type('input[placeholder="Ваше имя"]', this.reportData.name)

                    await page.type('input[type="email"]', this.reportData.email)

                    await page.click('.zsSJk._16jAB._36y1j._1Wa3F')
                }
                catch (err)
                {
                    await page.click('.zsSJk._16jAB._36y1j._1Wa3F')
                }

                await logger.info("Жалоба на товар: " + url + " была успешно отправлена.")

            }


            if(takeUr)
            {
                // const box = await page.$('._1n1ci')
                // const handleBox = await box.boundingBox()
                //
                // await page.mouse.move(handleBox.x, handleBox.y)
                   await page.hover('._1n1ci')
            }

            await this.browser.close();

            return content
        }
        catch (err)
        {
            await logger.error("При выполнении произошла ошибка, пробую ещё раз - " + err)
            await this.browser.close();
            return false
        }

    }
}

module.exports = new puppeteerService()