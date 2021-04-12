const express = require('express')
const router = express.Router()
const sqlQuery = require('../../db')

router.get('/',(req,res)=>{
    //res.render('loginchoose')
    //for-loop displaying unconfirmed coming orders
    let unconfirmed = ["1", "2", "3", "4", "5"];
    let unfinished = ["6", "7", "8", "9", "10"];
    let options = {
        unconfirmed,
        unfinished
    };
    //res.render('orderCanteenUI.ejs', options)
    res.render('orderCanteenUI', options);
})

module.exports = router