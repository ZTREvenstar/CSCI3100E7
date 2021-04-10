const express = require('express')
const router = express.Router()
const sqlQuery = require('../../db')

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/', async (req, res) => {
    console.log(req.body)
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