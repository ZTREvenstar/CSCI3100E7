const express = require('express')
const path = require('path')
//const moment = require('moment')
//const logger = require('./middleware/logger')
const cors = require("cors")
const mysql = require('mysql')
const session = require("express-session")


const app = express()
app.use(cors())
app.use('/public', express.static(path.join(__dirname, '..','public')));
// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: 'ffiouioiyig',
    cookie:{
        maxAge:7*24*60*60*1000
    },
    resave: true,
    saveUninitialized: true
}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// app.use('/api/backend_functions', require('./routes/api/backend_functions'))

// app.use('/api/comment_back', require('./routes/api/comment_back'))

// app.use('/api/order_back', require('./routes/api/order_back'))

// orderCanteenUI router, for testing
app.use('/api/order', require('./routes/api/order'))


app.use('/api/canteen', require('./routes/api/canteen'))

//login router
app.use('/api/login', require('./routes/api/login'))

//register router
app.use('/api/register', require('./routes/api/register'))

app.use('/api/com', require('./routes/api/comment_back'))

//profile manager router
app.use('/api/profile', require('./routes/api/profile'))


const PORT = process.env.PORT || 80
app.listen(PORT, ()=>console.log(`Serevr started on PORT ${PORT}`))
