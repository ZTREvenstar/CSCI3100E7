var express = require('express');
//var http = require('http');
//var mysql      = require('mysql');
const sqlQuery = require('../../db');
const multer = require('multer') // v1.0.5
const upload = multer() 
const router=express.Router()
router.use(express.json())
router.use('/',express.static('../../../client/Comment'))
//var app=express();
/*var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '990511',
  database : 'mysql'
});*/


router.all('/*', (req, res,next) => {
	/* set response header */
	res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST");
    res.setHeader("Access-Control-Allow-Headers", "*");
	res.setHeader('Content-Type', 'application/json');
	next();
});
router.post('/addC/cid/:cid/dishId/:dishId/content/:content/:rate', async (req, res) => {
        var sql='SELECT MAX(id) AS MI FROM comment';
        let id=await sqlQuery(sql);
        console.log(id[0].MI);
        sql='INSERT INTO comment (id,dishId,customerId,content,likeNum,rating) VALUES (?,?,?,?,0,?)';
        var addSqlParams=[id[0].MI+1,req.params.dishId,req.params.cid,req.params.content,req.params.rate];
        sqlQuery(sql,addSqlParams);
        res.json(id);	
});
router.get('/comment/:dishId',async (req,res)=>{
    var dish=req.params.dishId;
    var sql='SELECT * FROM comment WHERE dishID='+dish;
    let d=await sqlQuery(sql);
    d.sort(function(a,b){return b['likeNum']-a['likeNum'];});
    res.json(d);
});
router.post('/like/:cid',async (req,res)=>{
    var cid=req.params.cid;
    var sql='UPDATE comment SET likeNum=likeNum+1 WHERE id='+cid;
    //console.log("like it");
    sqlQuery(sql);
    var sql='SELECT likeNum as LN FROM comment WHERE id='+cid;
    var ln=await sqlQuery(sql);
    res.json(ln);

});
router.get('/dish',async (req,res)=>{
    var dish_list = [{ "name": '猪骨拉面', "status": 'open', "price": 31,"id":1 }, { "name": '汉堡', "status": 'close', "price": 23, "id":2 }];
    res.json(dish_list);
});
router.get('/dish/:canID',async (req,res)=>{
    var sql="SELECT * FROM dish WHERE canteenID="+req.params.canID;
    let dish=await sqlQuery(sql);
    dish.sort(function(a,b){return b['rating']-a['rating'];});
    res.json(dish);
});
router.post('/deleteC/:cid/:cID',async (req,res)=>{
    console.log("delete it");
    var sql="SELECT customerID AS CID FROM comment WHERE id="+req.params.cid;
    var re=await sqlQuery(sql);
    console.log(re[0].CID,req.params.cID);
    if (re[0].CID!=req.params.cID){
        res.send(false);
    }else{
        var sql="DELETE FROM comment WHERE id="+req.params.cid;
    sqlQuery(sql);
    res.send(true);
    }
});
router.get('/canteen',async (req,res)=>{
    var sql='SELECT * FROM canteen';
    let d=await sqlQuery(sql);
    res.json(d);
});

router.get('/canteen/:cid',async (req,res)=>{
    var tmp=req.params.cid;
    var sql='SELECT * FROM dish WHERE canteenID='+tmp;
    let d=await sqlQuery(sql);
    res.json(d);
});
/*var server = app.listen(3000, function () {
 
	var host = server.address().address
	var port = server.address().port
   
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
   
  })*/
  module.exports = router
