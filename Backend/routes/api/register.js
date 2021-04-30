const express = require('express')
const router = express.Router()
const sqlQuery = require('../../db')

// router.get('/', (req, res) => {
//     res.render('register')
// })

//register
router.post('/', async (req, res) => {
    console.log(req.body)
    if(req.body.id == undefined||req.body.username == undefined||req.body.password == undefined){
        res.status(200),send('empty')
    }
    if(isNaN(req.body.id)){
        res.status(200),send('id must be integers, please check again')
    }
    if(req.body.username.length > 10){
        res.status(200),send('username’s length should be less than 10, please check  again')
    }
    if(req.body.password.length > 40){
        res.status(200),send("password’s length should be less than 40, please check  again")
    }
    let sqlStr = "select * from customer where id = '" + req.body.id + "';"
    console.log(sqlStr)
    let search_result = await sqlQuery(sqlStr)
    if (search_result.length > 0) {
        res.status(200).send("account already exist")
    }
    else {
        sqlStr = "insert into customer (id,username,password) VALUES ('" + req.body.id + "','" + req.body.username + "','" + req.body.password + "');"
        let result = await sqlQuery(sqlStr)
        console.log(JSON.stringify(result))
        res.status(200).send("register success")
    }
})

module.exports = router