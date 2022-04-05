const task = require('../models/parser_tasks.model')
const statusTask = require('../models/parser_status_tasks.model')
const logger = require('./logger')

class parser_dbService
{
    async createTask(data)
    {
        try
        {
            await logger.info(data)
            const res = await task.create({task:data.task,user_id:data.user_id})
            return res
        }
        catch (err)
        {
            await logger.error("parser_dbService error: " + err)
            return false
        }
    }

    async create_status_task(status_data)
    {
        try
        {
                const res = await statusTask.create({data:status_data.data,status:status_data.status,task_id:status_data.task_id})
                return res.dataValues.id

        }
        catch (err)
        {
            await logger.error("parser_dbService create error: " + err)
            return false
        }
    }

    async update_status_task(data)
    {


        try
        {
            const res = await statusTask.findOne({where:{id:data.last_id}}) ? await statusTask.update({data: data.data}, {where: {id: data.last_id}}) : await statusTask.create({data:data.data,task_id:data.task_id})
            return true
        }
        catch (err)
        {
            await logger.error("parser_dbService update error: " + err)
            return false
        }
    }
}

module.exports = new parser_dbService()