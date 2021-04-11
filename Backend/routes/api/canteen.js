const express = require('express')
//var bodyParser = require('body-parser')
const sqlQuery = require('../../db')
const multer = require('multer') // v1.0.5
const upload = multer() 


const router = express.Router()
router.use(express.json())
router.use('/',express.static('../../../client/Canteen Interface'))

router.all('/*', (req, res, next) => {
	/* set response header */
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST");
	res.setHeader("Access-Control-Allow-Headers", "*");
	res.setHeader('Content-Type', 'application/json');
	next();
})


router.get('/', (req, res)=> {

	console.log("get dish");
	var dish_list = [{ "name": '123123123', "status": 'open', "price": 31 }, { "name": 'cB', "status": 'close', "price": 231 }];
    res.json(dish_list);

})

//Two way -----either "then()" or "async and await" takes effects
router.get('/dish', async (req, res)=> {

	console.log("get dish");
    var strSql = 'SELECT * FROM dish';
    //strSql = "desc dish;";
    let dish_list = await sqlQuery(strSql);
	console.log(dish_list);

    res.json(dish_list);


})

router.get('/order',async (req, res)=> {

    var strSql = 'SELECT * FROM orderinf';
    //var strSql = 'desc orderinf;';
    let order_list = await sqlQuery(strSql);
	console.log(order_list);
    res.json(order_list);
})


router.post('/dish',upload.array(),(req, res)=>{


    let data = req.body;
    var strSql = "insert into dish (id,status,price, canteenID, commentID,img) values(?,?,?,?,?,?);"

    sqlQuery(strSql, 
        [data['id'],data['status'],data['price'],data['canteenID'],data['commentID'],data['img']]);

    res.status(200).send();

})

router.post('/order',upload.array(), (req, res)=> {
    let data = req.body;
    //console.log([data['id'],data['customerID'],data['dishID'],data['time'],data['status'],data['charge']])
    var strSql = "insert into orderinf (id,customerID,dishID, time, status,charge) values(?,?,?,?,?,?);"
    sqlQuery(strSql, 
        [data['id'],data['customerID'],data['dishID'],data['time'],data['status'],data['charge']]);

	res.status(200).send();

})


router.put('/dish',upload.array(), (req, res)=> {
    let data = req.body;
   
    var strSql = "update dish set status=?, price=?, canteenID=?, commentID=?, img=? WHERE id=?;"
    sqlQuery(strSql, 
        [data['status'],data['price'],data['canteenID'],data['commentID'],data['img'],data['id']]);

	res.status(200).send();

})

router.put('/order',upload.array(), (req, res)=> {
    let data = req.body;
    console.log(data);
    var strSql = "update orderinf set customerID=?, dishID=?, time=?, status=?, charge=? WHERE id=?;"
    sqlQuery(strSql, 
        [data['customerID'],data['dishID'],data['time'],data['status'],data['charge'],data['id']]);

	res.status(200).send();

})

router.delete('/dish',  (req, res)=> {

	console.log(req.query.id);
    var strSql = "delete from dish WHERE id=?;"
    sqlQuery(strSql, 
        [req.query.id]);

    res.status(200).send();

})

router.delete('/order',  (req, res)=> {

	console.log(req.query.id);
    var strSql = "delete from orderinf WHERE id=?;"
    sqlQuery(strSql, 
        [req.query.id]);

	res.status(200).send();

})



module.exports = router;