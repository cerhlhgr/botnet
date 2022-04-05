const logger = require('./logger')
const axios = require("axios");

class proxyService
{
    async get()
    {
        try
        {
            const proxy = await axios.get('http://proxy-bunker.com/api2.php');
            await logger.info('Успешно получен новый прокси лист.')

            if(proxy.data.split('\r\n'))
            {
                return {data:proxy.data.split('\r\n'),len: proxy.data.split('\r\n').length}
            }
        }
        catch (err)
        {
            await logger.error("При получении прокси произошла ошибка: " + err)
            return false
        }
    }


}

module.exports = new proxyService()