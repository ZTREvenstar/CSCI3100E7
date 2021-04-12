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



module.exports = router