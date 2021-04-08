var express = require('express');
const router = express.Router()


var http = require('http');
var mysql      = require('mysql');
var app=express();
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '990511',
  database : 'mysql'
});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
app.all('/*', (req, res,next) => {
	/* set response header */
	res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST");
    res.setHeader("Access-Control-Allow-Headers", "*");
	res.setHeader('Content-Type', 'application/json');
	next();
});
app.post('/addC/cid/:cid/dishId/:dishId/content/:content', (req, res) => {
        var sql='SELECT MAX(id) AS MI FROM Comment';
        var id;
        connection.query(sql,function(err,result){
            if(err){
                console.log('err')
                return;
            }
            //console.log(result[0].MI);
            id=result[0].MI+1;
            console.log(id)
            sql='INSERT INTO Comment (id,dishId,customerId,content,likeNum) VALUES (?,?,?,?,0)';
        var addSqlParams=[id,req.params.dishId,req.params.cid,req.params.content];
		connection.query(sql,addSqlParams,function(err,result){
            if(err){
                console.log(err);
                return;
            }
            res.send({ 'cid': id });
        });
        });
        
        
	
});
app.get('/comment/:dishId',(req,res)=>{
    var dish=req.params.dishId;
    console.log(dish);
    var sql='SELECT * FROM Comment WHERE dishID='+dish;
    connection.query(sql,function(err,result){
        if(err){
            return;
        }
        res.send(result);
    })
});
app.post('/like/:cid',(req,res)=>{
    var cid=req.params.cid;
    var sql='UPDATE Comment SET likeNum=likeNum+1 WHERE id='+cid;
    connection.query(sql,function(err,result){
   if(err){
    return err;
    }
    });
    var sql='SELECT likeNum FROM Comment WHERE id='+cid;
    connection.query(sql,function(err,result){
   if(err){
    return err;
    }
    res.send(result);
    })

});
app.get('/dish',(req,res)=>{
    var dish=[1];
    res.send({'dish':dish});
});
app.post('/deleteC/:cid',(req,res)=>{
    var sql="DELETE FROM Comment WHERE id="+req.params.cid;
    connection.query(sql,function(err,result){
        if(err){
            return err;
        }
        res.send(result);
    })

});
var server = app.listen(3000, function () {
 
	var host = server.address().address
	var port = server.address().port
   
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
   
  })
  module.exports = router