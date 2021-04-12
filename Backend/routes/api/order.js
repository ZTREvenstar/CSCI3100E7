const express = require('express')
const router = express.Router()
const sqlQuery = require('../../db')

router.get('/canteen',(req,res)=>{
    //for-loop displaying unconfirmed coming orders
    let unconfirmed = ["1", "2", "3", "4", "5"];
    let unfinished = ["6", "7", "8", "9", "10"];
    let options = {
        unconfirmed,
        unfinished
    };
    //res.render('orderCanteenUI.ejs', options)
    res.type('html');
    res.render('orderCanteenUI', options);
})

router.get('/customer', (req,res)=>{
    res.type('html');
    res.render('orderCustomerUI');
})

router.get('/makeorder/cid:cid/did:did', async (req, res)=>{

    let sql = 'SELECT MAX(orderID) FROM orderinfo';
    let result = await sqlQuery(sql);
    console.log(result[0]['MAX(orderID)']);
    let neworderID = result[0]['MAX(orderID)'] + 1;

    let cid = req.params.cid;
    let did = req.params.did;
    let myDate = new Date();
    let nowDateTime = String(myDate.getFullYear()) + '-'
                    + String(myDate.getMonth()) + '-'
                    + String(myDate.getDay()) + ' '
                    + String(myDate.getHours()) + ':'
                    + String(myDate.getMinutes()) + ':'
                    + String(myDate.getSeconds());

    console.log(nowDateTime);

    let orderstatus = 0; // newly come, has not been confirmed yet
    let charge = 2.5;

    sql = 'INSERT INTO orderinfo VALUES (?, ?, ?, ?, ?)';
    let addSqlParams = [neworderID, cid, nowDateTime, orderstatus, charge];
    await sqlQuery(sql, addSqlParams);

    sql = 'SELECT * FROM orderinfo';
    result = await sqlQuery(sql);
    for(let i = 0; i < result.length; i++)
    {
        console.log(result);
    }
    res.send("hahahahahaha")
})



module.exports = router