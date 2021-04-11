const express = require('express')
const router = express.Router()
const sqlQuery = require('../../db')

//login page
router.get('/', (req, res) => {
    res.render('login')
})


//deal with login request
router.post('/', async (req, res) => {
    console.log(req.body)
    let id = req.body.id
    let password = req.body.password
    let strSql = "select * from customer where id = '" + id + "'and password = '" + password + "';"
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

// router.get('/register',async(req,res)=>{
//     console.log(req.quer)
//     letstrSql = "insert ignore into userinfo (,,) values ('" + req.query.username + "','" + req.query.password + "');"
// })

module.exports = router