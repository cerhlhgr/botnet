const cheerio = require('cheerio');
const logger = require("../services/logger")
const puppeteer = require('puppeteer')

class parserCompanies
{
    errorTry = 50

    async exec(url)
    {
        try {

            if(this.errorTry == 0)
            {
                this.errorTry = 50;
                return true
            }

            await logger.warn("Количество попыток переподключейний: " + this.errorTry)
            await logger.info("URL: " + url)

            this.browser = await puppeteer.launch({
                headless: false,
                args: ['--proxy-server=zproxy.lum-superproxy.io:22225']

            });

            const page = await this.browser.newPage();

            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

            await page.authenticate({
                username: 'lum-customer-hl_8aa81c7b-zone-data_center',
                password: 'wqcovzz78yz0'
            });

            await page.goto(url);

            let content = await page.content();

            let resTree = await cheerio.load(content);

            if(resTree('.Text.Text_weight_medium.Text_typography_headline-s').eq(0).text() == 'Подтвердите, что запросы отправляли вы, а не робот' || resTree('.content__h1').eq(0).text() == 'Доступ к нашему сервису временно запрещён!' )
            {
                while(resTree('.Text.Text_weight_medium.Text_typography_headline-s').eq(0).text() == 'Подтвердите, что запросы отправляли вы, а не робот' || resTree('.content__h1').eq(0).text() == 'Доступ к нашему сервису временно запрещён!')
                {
                    await this.browser.close();
                    content = await this.exec(url)
                    resTree = await cheerio.load(content);
                }
            }
            if(resTree('._1KpjX._2Wg9r').text() === "Показать всё")
            {
                console.log("нащупал кнопку")

                await page.click('._1KpjX._2Wg9r')
                content = await page.content();

            }


         //   await this.browser.close();

            return content
        }
        catch (err)
        {
            await logger.error("При выполнении произошла ошибка, пробую ещё раз")
            await this.browser.close();

            if(this.errorTry != 0)
            {
                this.errorTry--
                return this.exec(url)
            }
            else
                return false

        }
    }

    async getCompanies(url)
    {
        try
        {
            let content = await this.exec(url)
            let resTree = await cheerio.load(content);
            let arr = []
            resTree('._3bc4b').each((i,m) =>
            {
                console.log(resTree(m).attr('name').trim())
              //  arr.push(resTree(m).text().trim())
            })

         //   const arr = ['California Gold Nutrition', 'Chikalab', 'CYBERMASS', 'Finish', 'Himalaya Herbals', 'Life Extension', 'Maxler','Natrol', 'NaturalSupp','NOW','Orthomol','Persil']
     //       return arr
        }
        catch (err)
        {
            await logger.error("get companies service error: " + err)
        }

    }


}

module.exports = new parserCompanies()
