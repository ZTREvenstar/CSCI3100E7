const express = require('express')
const router = express.Router()
const sqlQuery = require('../../db')

// // Body parser middleware
// let bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({extended: false}))
// router.use(bodyParser.json())
// router.use(express.json())

router.get('/canteen',async (req,res)=>{

    let cid = req.query.canteenID;

    let dataSend = [];

    // unconfirmed
    let sql = 'SELECT O.orderID AS orderID, O.status AS status, D.name AS dishName ' +
              'FROM orderinfo O, dish D ' +
              'WHERE O.status = 0 AND D.id = O.dishID AND D.canteenID = ?';
    let addSqlParams = [cid];
    let result = await sqlQuery(sql, addSqlParams);
    dataSend.push(result);

    // unfinished
    sql = 'SELECT O.orderID AS orderID, O.status AS status, D.name AS dishName ' +
        'FROM orderinfo O, dish D ' +
        'WHERE O.status = 1 AND D.id = O.dishID AND D.canteenID = ?';
    addSqlParams = [cid];
    result = await sqlQuery(sql, addSqlParams);
    dataSend.push(result);

    // finished
    sql = 'SELECT O.orderID AS orderID, O.status AS status, D.name AS dishName ' +
          'FROM orderinfo O, dish D ' +
          'WHERE O.status = 2 AND D.id = O.dishID AND D.canteenID = ?';
    addSqlParams = [cid];
    result = await sqlQuery(sql, addSqlParams);
    dataSend.push(result);

    res.json(dataSend);
})

router.get('/customer', async (req,res)=>{

    let cid = req.query.customerID;

    let dataSend = [];

    // unconfirmed
    let sql = 'SELECT O.orderID AS orderID, O.status AS status, D.name AS dishName, D.price AS price, C.name AS canteenName FROM orderinfo O, dish D, canteen C WHERE O.status = 0 AND O.customerID = ? AND D.id = O.dishID AND D.canteenID = C.id';
    let addSqlParams = [cid];
    let result = await sqlQuery(sql, addSqlParams);
    dataSend.push(result);

    // unfinished
    sql = 'SELECT O.orderID AS orderID, O.status AS status, D.name AS dishName, D.price AS price, C.name as canteenName ' +
          'FROM orderinfo O, dish D, canteen C ' +
          'WHERE O.status = 1 AND O.customerID = ? ' +
                'AND D.id = O.dishID ' +
                'AND D.canteenID = C.id';
    addSqlParams = [cid];
    result = await sqlQuery(sql, addSqlParams);
    dataSend.push(result);

    // finished
    sql = 'SELECT O.orderID AS orderID, O.status AS status, D.name AS dishName, D.price AS price, C.name as canteenName ' +
          'FROM orderinfo O, dish D, canteen C ' +
          'WHERE O.status = 2 AND O.customerID = ? ' +
            'AND D.id = O.dishID ' +
            'AND D.canteenID = C.id';
    addSqlParams = [cid];
    result = await sqlQuery(sql, addSqlParams);
    dataSend.push(result);

    console.log(dataSend);

    res.json(dataSend);
})

router.get('/makeorder', async (req, res)=>{

    let sql = 'SELECT MAX(orderID) FROM orderinfo';
    let result = await sqlQuery(sql);
    console.log(result[0]['MAX(orderID)']);
    let neworderID = result[0]['MAX(orderID)'] + 1;

    let cid = req.query.cid;
    let did = req.query.did;
    let myDate = new Date();
    let nowDateTime = String(myDate.getFullYear()) + '-'
                    + String(myDate.getMonth()) + '-'
                    + String(myDate.getDay()) + ' '
                    + String(myDate.getHours()) + ':'
                    + String(myDate.getMinutes()) + ':'
                    + String(myDate.getSeconds());

    let orderstatus = 0; // newly come, has not been confirmed yet

    sql = 'INSERT INTO orderinfo VALUES (?, ?, ?, ?, ?)';
    let addSqlParams = [neworderID, cid, did, nowDateTime, orderstatus];
    await sqlQuery(sql, addSqlParams);

    sql = 'SELECT * FROM orderinfo';
    result = await sqlQuery(sql);
    for(let i = 0; i < result.length; i++)
    {
        console.log(result[i]);
    }
    res.send("Success!")
})

// canteen updates order status
router.post('/updateorder',  async (req, res)=>{
    console.log(req.body.orderID);
    let orderID = req.body.orderID;
    let operation = req.body.operation;

    let sql;
    let addSqlParams;
    let result;

    if (operation == 1) {
        sql = 'SELECT status FROM orderinfo WHERE orderID = ?';
        addSqlParams = [orderID];
        result = await sqlQuery(sql, addSqlParams);
        console.log("Status before:");
        console.log(result[0]['status']);
        let newStatus = result[0]['status'] + 1;

        sql = 'UPDATE orderinfo SET status = ? WHERE orderID = ?';
        addSqlParams = [newStatus, orderID];
        await sqlQuery(sql, addSqlParams);

        sql = 'SELECT status FROM orderinfo WHERE orderID = ?';
        addSqlParams = [orderID];
        result = await sqlQuery(sql, addSqlParams);
        console.log("Status after:");
        console.log(result[0]['status']);
    }

    if (operation == 2){
        sql = 'DELETE FROM orderinfo WHERE orderID = ?';
        addSqlParams = [orderID];
        await sqlQuery(sql, addSqlParams);
    }

    res.send("Completed!");
})


module.exports = router