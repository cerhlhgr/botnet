const logger = require("../services/logger")
const parser = require("../services/parser")

class defaultController
{
    async startParse(req,res)  //Обработка входных данных
    {

        try
        {
            const start = new Date().getTime();

            const parseData = {
                search_string: req.body.search_string ? req.body.search_string : "",
                without_company:req.body.without_company ? req.body.without_company : [],
                page_count:req.body.page_count ? req.body.page_count : 10
            }

            const reportData = {
                what_matter: req.body.what_matter ? req.body.what_matter.trim() : "",
                reason: req.body.reason ? req.body.reason.trim() : "",
                desc_problem:req.body.desc_problem ? req.body.desc_problem.trim() : "",
                name: req.body.name ? req.body.name.trim() : "",
                email:req.body.email ? req.body.email.trim() : ""
            }

            const url = "https://market.yandex.ru/search?cvredirect=2&text="+ parseData.search_string +"&local-offers-first=0"

            await logger.info("Запрос: " + url)
            await logger.info("Поступивший запрос: \n" + JSON.stringify(parseData, null, 4))

            await parser.setUrl(url, parseData.without_company, parseData.page_count, reportData)

            const res = await parser.start() ? res.send({status:"successfully", message:"Parser start work."}) : res.send({status:"error", message:"Runtime error"})

            const end = new Date().getTime();

            await logger.info("Время работы парсера: " + `${end - start} ms`)
        }
        catch (err)
        {
            res.statusCode = 400
            res.send({status:"error", message:"request incorrectly."})

            await logger.error("Error in /controllers/defaultController method: startParse. msg error: \n" + err)
            return false
        }
    }

}

module.exports = new defaultController()