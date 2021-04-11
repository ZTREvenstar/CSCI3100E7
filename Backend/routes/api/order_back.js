const express = require('express');
const router = express.Router();

router.all('/*', (req, res,next) => {
    //set response header
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader('Content-Type', 'application/json');
    next();
})


// for testing, directly get into orderCanteenUI
router.get('/', (req,res)=>{

    //for-loop displaying unconfirmed coming orders
    let unconfirmed = ["1", "2", "3", "4", "5"];
    let unfinished = ['6', '7', '8', '9', '10'];
    let options = {
        unconfirmed,
        unfinished
    };
    res.render('orderCanteenUI.ejs', options)
    res.render("orderCanteenUI", options);
})








// // function for change order status in SQL database, return message to the canteen frontend
// router.get('/order_canteen_interface', function(req, res){
//     var info_type;
//     if(info_type==0){} // request for confirm the order
//     if(info_type==1){} // request for send order finished info
//     res.send('order finished!')
// })
//
// //  function for check newly coming orders in SQL, and push them to canteen front end
// router.post('/orderCanteenUI', function(req,res){
//
// })
//
// //  function for check order status, return message to the customer frontend
// router.get('/OrderCustomerUI', function(req, res){
//     var info_type;
//     if(info_type==0){} // request for confirm the order
//     if(info_type==1){} // request for send order finished info
//     res.send('order finished!')
// })


module.exports = router