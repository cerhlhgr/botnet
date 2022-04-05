const logger = require("../services/logger")
const parserService = require('../services/parser_db.service')
const parser_companies = require("../services/parser_companies")
class parserYM
{

    async startParse(data)  //Обработка входных данных
    {
        let status = 0 // 0 - в процессе, 1 - успешно, 2 - с ошибками, 3 - критическая ошибка при выполнении

        try
        {
            await logger.info("Запрос: " + data.url)

            await logger.info("Поступивший запрос: \n" + JSON.stringify(data, null, 4))

            const task = {
                task:{
                    url:data.url,
                    without_company:data.parseData.without_company,
                    page_count:data.parseData.page_count,
                    reportData: data.reportData,
                    type:data.type
                },
                user_id:data.user_id
            }


            const create = await parserService.createTask(task)

            const task_id = create ? create.dataValues.id : false

            await logger.info("Таска создана: " + task_id)

            if(task_id)
            {
                const parser = require("../services/parser")

                 await parser.setUrl(data.url, data.parseData.without_company, data.parseData.page_count, data.reportData, task_id)

                 const res = await parser.processParse() ? status = 1 : status = 2

                if(status == 1)
                    await logger.info("Задача полностью выполнена успешно.")

                if(status == 2)
                {
                    await logger.warn("Задача выполнена с ошибками.")
                }
            }
            else
            {
                status = 3
                await logger.fatal('При получении task_id произошла ошибка, парсинг невозможен.')
            }

        }
        catch (err)
        {
            status = 3
            await logger.error("Error in /controllers/parserYM method: startParse. msg error: \n" + err)
            return false
        }
    }


    async getCompanies(url)
    {
        const res = await parser_companies.getCompanies(url)
        await logger.info('Результат этого всего очень очевиден')
        return {response:res}
    }

}

module.exports = new parserYM()