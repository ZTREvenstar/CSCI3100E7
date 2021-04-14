const express = require('express')
//var bodyParser = require('body-parser')
const sqlQuery = require('../../db')
const multer = require('multer') 
var path = require("path"), fs = require("fs");

const router = express.Router()
router.use(express.json())
//router.use('/',express.static('../../../client/Canteen Interface'))



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
	//res.setHeader('Content-Type', 'application/json');
	next();
})



router.get('/', (req, res)=> {
	console.log(req.query.id);
    //fs.readFile(path.join(__dirname, '..', '..', 'foo.bar'));
    console.log(path.join(__dirname, '..', '..', '..','client','Canteen Interface','Canteen_Interface_Main_page.html' ));
    res.sendFile(path.join(__dirname, '..', '..', '..','client','Canteen Interface','Canteen_Interface_Main_page.html' ),root=path.join(__dirname, '..', '..', '..','client','Canteen Interface'))
	/*
    console.log("get dish");
	var dish_list = [{ "name": '123123123', "status": 'open', "price": 31 }, { "name": 'cB', "status": 'close', "price": 231 }];
    res.json(dish_list);
    */

})

router.get('/React.js', (req, res)=> {
	console.log(req.query.id);
    //fs.readFile(path.join(__dirname, '..', '..', 'foo.bar'));
    console.log(path.join(__dirname, '..', '..', '..','client','Canteen Interface','React.js' ));
    res.sendFile(path.join(__dirname, '..', '..', '..','client','Canteen Interface','React.js' ))
	/*
    console.log("get dish");
	var dish_list = [{ "name": '123123123', "status": 'open', "price": 31 }, { "name": 'cB', "status": 'close', "price": 231 }];
    res.json(dish_list);
    */

})




//Two way -----either "then()" or "async and await" takes effects
router.get('/dish', async (req, res)=> {

	//console.log("get dish");
    var strSql = 'SELECT * FROM dish';
    //strSql = "desc dish;";
    let dish_list = await sqlQuery(strSql);
	//console.log(dish_list);

    res.json(dish_list);


})

//order should belong to certain canteen

router.get('/order',async (req, res)=> {
    var canteenid= req.query['id'];
    var strSql = 'SELECT * FROM orderinf';
    /*there is canteenid 
    if (canteenid){
        strSql= 'SELECT * FROM orderinf WHERE '
    }
    */
    //var strSql = 'desc orderinf;';
    let order_list = await sqlQuery(strSql);
	//console.log(order_list);
    res.json(order_list);
})


router.post('/dish',upload.array(),(req, res)=>{


    let data = req.body;
    var strSql = "insert into dish (id,name,status,price, canteenID, img) values(?,?,?,?,?,?);"

    sqlQuery(strSql, 
        [data['id'],data['name'],data['status'],data['price'],data['canteenID'],data['img']]);

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
   
    var strSql = "update dish set status=?, price=?, canteenID=?,  img=? WHERE id=?;"
    sqlQuery(strSql, 
        [data['status'],data['price'],data['canteenID'],data['img'],data['id']]);

	res.status(200).send();

})

router.put('/order',upload.array(), (req, res)=> {
    let data = req.body;
    console.log(data);
    var strSql = "update orderinf set name=?, customerID=?, dishID=?, time=?, status=?, charge=? WHERE id=?;"
    sqlQuery(strSql, 
        [data['name'],data['customerID'],data['dishID'],data['time'],data['status'],data['charge'],data['id']]);

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

router.post('/img', upload.single('img'), function(req,res){
	var file = req.file;
	console.log(file)
	console.log(req.body.id);
	res.send('success');
})


module.exports = router;