const express = require('express')
const sqlQuery = require('../../db')
const multer = require('multer') 
var path = require("path"), fs = require("fs");

const router = express.Router()
router.use(express.json())



var createFolder = function(folder){
    try{
        fs.accessSync(folder); 
    }catch(e){
        fs.mkdirSync(folder);
    }  
};

var profilePicFolder = path.join(__dirname, '..', '..', '..','public','canteen');

createFolder(profilePicFolder);

var profilePicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, profilePicFolder);   
    },
    filename: function (req, file, cb) {
		//console.log("namingfiles");
		let id = req.body.id;
		console.log(id);
		fs.unlink(profilePicFolder+"/"+id +".png", (err) => {
			if (err) {
			  console.error(err)
			  return
			}
		})
		var profilePicName = id +".png";
        cb(null, profilePicName);  
    }
});

const upload = multer({storage: profilePicStorage });

router.all('/*', (req, res, next) => {
	/* set response header */
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST");
	res.setHeader("Access-Control-Allow-Headers", "*");
	next();
})










//Two way -----either "then()" or "async and await" takes effects
router.get('/dish', async (req, res)=> {
	let canteenID = req.query.id
//	console.log("type is"+typeof(canteenID));
	if (canteenID==null||canteenID==undefined||canteenID==""){
	res.send("canteen id required")
	}
	if(isNaN(canteenID)){
	res.send("canteen id should be a number")
	}
    var strSql = 'SELECT * FROM dish WHERE canteenID='+canteenID;
  //  strSql = "desc dish;";
    let dish_list = await sqlQuery(strSql);
	//console.log(dish_list);

    res.json(dish_list);


})








/*
router.post('/dish',upload.array(),(req, res)=>{


    let data = req.body;
    var strSql = "insert into dish (id,name,status,price, canteenID, img) values(?,?,?,?,?,?);"

    sqlQuery(strSql, 
        [data['id'],data['name'],data['status'],data['price'],data['canteenID'],data['img']]);

    res.status(200).send();

})*/
router.post('/dish',upload.array(),async (req, res)=>{

    let sql = 'SELECT MAX(id) AS oldID FROM dish';
    let result = await sqlQuery(sql);
    let new_dishID = result[0]['oldID'] + 1;

    let data = req.body;
	
	if (data==null||data==undefined){
		res.send("Please fill the form")
	}
	if (data['name']==null||data['name']==undefined||data['name']==""){
		res.send("Menu's name should not be empty")
	}
	if (data['price']==null||data['price']==undefined||data['price']==""){
		res.send("Menu's price is required")
	}
	if(isNaN(data['price'])){
		res.send("Menu's price should bea numebr")
	}
	
    let strSql = "insert into dish (id,name,status,price, canteenID) values(?,?,?,?,?);"

    sqlQuery(strSql,
        [new_dishID,data['name'],data['status'],data['price'],data['canteenID']]);

    res.status(200).send();

})




router.put('/dish',upload.array(), (req, res)=> {
    let data = req.body;
   
    var strSql = "update dish set status=?, price=?, canteenID=? WHERE id=?;"
    sqlQuery(strSql, 
        [data['status'],data['price'],data['canteenID'],data['id']]);

	res.status(200).send();

})



router.delete('/dish',  (req, res)=> {

	console.log(req.query.id);
	if (req.query.id==null||req.query.id==undefined||req.query.id==""){
	res.send("dish id required")
	}
	if(isNaN(req.query.id)){
	res.send("dish id should be a number")
	}
    var strSql = "delete from dish WHERE id=?;"
    sqlQuery(strSql, 
        [req.query.id]);

    res.status(200).send();

})


router.post('/img', upload.single('img'), function(req,res){
	var file = req.file;
	console.log(file)
	console.log(req.body.id);
	res.send('success');
})


module.exports = router;
