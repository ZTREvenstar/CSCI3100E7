const express = require('express')
const router = express.Router()
const sqlQuery = require('../../db')

// // Body parser middleware
// let bodyParser = require('body-parser');
// router.use(bodyParser.urlencoded({extended: false}))
// router.use(bodyParser.json())
// router.use(express.json())

router.get('/canteen',async (req,res)=>{

    // unconfirmed
    let sql = 'SELECT orderID FROM orderinfo WHERE status = 0';
    let result = await sqlQuery(sql);
    let unconfirmed = [];
    for(let i = 0; i < result.length; i++)
        unconfirmed.push(result[i]['orderID']);

    // unfinished
    sql = 'SELECT orderID FROM orderinfo WHERE status = 1'
    result = await sqlQuery(sql);
    let unfinished = [];
    for(let i = 0; i < result.length; i++)
        unfinished.push(result[i]['orderID']);

    // finished
    sql = 'SELECT orderID FROM orderinfo WHERE status = 2'
    result = await sqlQuery(sql);
    let finished = [];
    for(let i = 0; i < result.length; i++)
        finished.push(result[i]['orderID']);

    // in ejs, for-loop displaying orders
    let options = {
        unconfirmed,
        unfinished,
        finished
    };

    res.type('html');
    res.render('orderCanteenUI', options);
})

router.get('/customer', async (req,res)=>{

    let cid = 111;

    // unconfirmed
    let sql = 'SELECT orderID FROM orderinfo WHERE status = 0 AND customerID = ?';
    let addSqlParams = [cid];
    let result = await sqlQuery(sql, addSqlParams);
    let myUnconfirmed = [];
    for(let i = 0; i < result.length; i++)
        myUnconfirmed.push(result[i]['orderID']);

    // unfinished
    sql = 'SELECT orderID FROM orderinfo WHERE status = 1 AND customerID = ?';
    addSqlParams = [cid];
    result = await sqlQuery(sql, addSqlParams);
    let myUnfinished = [];
    for(let i = 0; i < result.length; i++)
        myUnfinished.push(result[i]['orderID']);

    // finished
    sql = 'SELECT orderID FROM orderinfo WHERE status = 2 AND customerID = ?';
    addSqlParams = [cid];
    result = await sqlQuery(sql, addSqlParams);
    let myFinished = [];
    for(let i = 0; i < result.length; i++)
        myFinished.push(result[i]['orderID']);

    // in ejs, for-loop displaying orders
    let options = {
        myUnconfirmed,
        myUnfinished,
        myFinished
    };

    res.type('html');
    res.render('orderCustomerUI', options);
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
    let charge = 2.5;

    sql = 'INSERT INTO orderinfo VALUES (?, ?, ?, ?, ?)';
    let addSqlParams = [neworderID, cid, nowDateTime, orderstatus, charge];
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



// for insert data to mysql in the testing stage
router.get('/sql', async (req, res) =>{

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

    console.log(nowDateTime);
    //console.log(cid);
    //console.log(did);

    let orderstatus = 2; // newly come, has not been confirmed yet
    let charge = 5;

    sql = 'INSERT INTO orderinfo VALUES (?, ?, ?, ?, ?)';
    let addSqlParams = [neworderID, cid, nowDateTime, orderstatus, charge];
    await sqlQuery(sql, addSqlParams);

    // let sql = 'INSERT INTO orderinfo VALUES';
    // let addSqlParams = [neworderID, cid, nowDateTime, orderstatus, charge];
    // await sqlQuery(sql, addSqlParams);
    console.log("reach here")
    res.send('aaaaaaaaaaaaaaaa')
})



module.exports = router