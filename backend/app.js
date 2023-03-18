const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require("cookie-parser")

require('./databaseconnection.js/db')

app.use(express.json({ limit: '200mb' }))
app.use(cors());
app.use(cookieParser());


app.use(require('./route/auth'))
app.use(require('./route/post'))

app.listen(5000, ()=>{
    console.log('app is running on port 5000');
})