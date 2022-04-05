
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const appRoot = require('app-root-path');
const logger = require('./logger')
class writer
{
    async csvFromat(data,timeStart)
    {
        try
        {
            const csvWriter = createCsvWriter({
              path: `${appRoot}/results/result_${timeStart}.csv`,
              filename:`${appRoot}/results/result_${timeStart}.csv`,
             //   path: `${appRoot}/results/result_${time.toLocaleDateString()ults}.csv`,
                header: [
                    {id: 'product', title: 'product_name'},
                    {id: 'url', title: 'url'},
                    {id: 'ur', title: 'ur'},
                ]
            });

            const res = await csvWriter.writeRecords(data)
        }
        catch (err)
        {
            await logger.fatal('При записи файла произошла ошибка: ' + err)
            return false
        }
    }

}

module.exports = new writer()