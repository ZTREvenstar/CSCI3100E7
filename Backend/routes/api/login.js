const express = require('express')
const router = express.Router()
const session = require('express-session')
const { stringify } = require('uuid')
const sqlQuery = require('../../db')

// router.get('/',(req,res)=>{
//     res.render('loginchoose')
// })

//useer login page
router.get('/user', (req, res) => {
    res.render('userlogin')
})


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
        
        let result_new = result.map((items)=>{
                return items
            })
        console.log(JSON.stringify(result_new))
        console.log(result_new)
        
        req.session.isCustomerLogin = 'true'
        req.session.userid = result_new[0].id
        req.session.username = result_new[0].username
        console.log(req.session)
        //console.log(req.session.id)
        // req.session.id = result_new[0].id
        // req.session.username = result_new[0].username
        //console.log(JSON.stringify(result_new[0].id))
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
    console.log(result)
    if (result.length == 0) {
        res.status(200).send('fail')
    }
    else {
        res.status(200).send(result.name)
    }
    //res.send("post method")
})

//canteen update ame and password
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

//provide port for front end to check session infromation
router.get('/session',(req,res)=>{
    console.log(req.session)
    if(req.session.isCustomerLogin){
        result = {'username':req.session.username,'id':req.session.userid }
        res.status(200).send(result)
    }
    else{
        res.status(200).send('false')
    }
})
module.exports = router