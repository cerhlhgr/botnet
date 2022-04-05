const express = require('express')
const app = express()
const port = 3000
const indexRoute = require("./routes/index")
const logger = require("./services/logger")
const body_parser = require("body-parser");

app.use(body_parser());

app.set('view engine', 'pug');

app.use("/api",indexRoute)

app.get('/', (req,res)=>{
    res.render('index',{title:"hello"})
})

app.listen(port, () => {
    logger.info("Server start on port: " + port)
})