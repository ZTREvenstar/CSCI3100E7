const express = require('express');
const app = express();

var http = require('http');

app.use(express.json());

app.all('/*', (req, res,next) => {
    /* set response header */
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader('Content-Type', 'application/json');
    next();
})

// function for change order status in SQL database, return message to the canteen frontend
app.get('/order_canteen_interface', function(req, res){
    var info_type;
    if(info_type==0){} // request for confirm the order
    if(info_type==1){} // request for send order finished info
    res.send('order finished!')
})

//  function for check newly coming orders in SQL, and push them to canteen front end
app.post('/order_canteen_interface', function(req,res){

})

//  function for check order status, return message to the customer frontend
app.get('/customer_canteen_interface', function(req, res){
    var info_type;
    if(info_type==0){} // request for confirm the order
    if(info_type==1){} // request for send order finished info
    res.send('order finished!')
})

// testing
var server = app.listen(3000, function(){
    var host = server.address().address
    var port = server.address().port

    console.log("access address: http://%s:%s", host, port)
})
