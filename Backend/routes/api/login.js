const express = require('express')
const router = express.Router()
const sqlQuery = require('../../db')

// router.get('/',(req,res)=>{
//     res.render('loginchoose')
// })

//useer login page
// router.get('/user', (req, res) => {
//     res.render('userlogin')
// })


//deal with user login request
router.post('/user', async (req, res) => {
    console.log(req.body)
    let id = req.body.id
    let password = req.body.password
    let strSql = "select * from customer where id = '" + id + "'and password = '" + password + "';"
    //let strSql = "show tables;"
    console.log(strSql)
    let result = await sqlQuery(strSql)
    if (result.length == 0) {
        res.status(200).json('fail')
    }
    else {
        res.status(200).json('success')
    }
    //res.send("post method")
})

// router.get('/canteen', (req, res) => {
//     res.render('canteenlogin')
// })


//deal with user login request
router.post('/canteen', async (req, res) => {
    console.log(req.body)
    let id = req.body.id
    let password = req.body.password
    let strSql = "select * from canteen where id = '" + id + "'and password = '" + password + "';"
    //let strSql = "show tables;"
    console.log(strSql)
    let result = await sqlQuery(strSql)
    if (result.length == 0) {
        res.status(200).send('fail')
    }
    else {
        res.status(200).send('success')
    }
    //res.send("post method")
})

router.put('/canteen',async(req,res)=>{
    console.log(req.body)
    let id = req.query.id
    let username = req.body.username
    let password = req.body.password
    let strSql = "update canteen set name = '"+ username +"' , password = '"+ password +"' where id = '"+ id +"';"
    let result = await sqlQuery(strSql)
    console.log(result)
    res.status(200).send()
})

module.exports = router