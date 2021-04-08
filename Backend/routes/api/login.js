const express = require('express')
const sqlQuery = require('../../db')
const router = express.Router()

router.get('/addsub', async (req, res) => {
    console.log(req.query)
    let strSql = "insert ignore into subscription (useremail,podcastID) values ('" + req.query.userEmail + "','" + req.query.podcastID + "');"
    console.log(strSql)
    let result = await sqlQuery(strSql)
    //console.log("result = " + result)
    res.status(200).send()
})