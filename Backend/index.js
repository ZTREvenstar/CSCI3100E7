const express = require('express')
const path = require('path')
//const moment = require('moment')
//const logger = require('./middleware/logger')
const cors = require("cors");
const mysql = require('mysql')


const app = express()
app.use(cors())

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// app.use('/api/backend_functions', require('./routes/api/backend_functions'))

// app.use('/api/comment_back', require('./routes/api/comment_back'))

// app.use('/api/order_back', require('./routes/api/order_back'))

// app.use('/api/order_back', require('./routes/api/order_back'))

//login router
app.use('/api/canteen', require('./routes/api/canteen'))
app.use('/api/login', require('./routes/api/login'))

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>console.log(`Serevr started on PORT ${PORT}`))
