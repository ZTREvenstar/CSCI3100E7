const express = require('express')
const sqlQuery = require('../../db')
const multer = require('multer') 

const bp = require('body-parser');
var path = require("path"), fs = require("fs");

const router = express.Router()

var createFolder = function(folder){
    try{
        fs.accessSync(folder); 
    }catch(e){
        fs.mkdirSync(folder);
    }  
};

var profilePicFolder = path.join(__dirname, '..', '..', '..','public','customer');

createFolder(profilePicFolder);

var profilePicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, profilePicFolder);   
    },
    filename: function (req, file, cb) {
		console.log("namingfiles");
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

var uploadProfilePic = multer({storage: profilePicStorage });
//router.use('/',express.static('../../../client/Canteen Interface'))


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
    console.log(path.join(__dirname, '..', '..', '..','client','Personal Info','personal.html' ));
    res.sendFile(path.join(__dirname, '..', '..', '..','client','Personal Info','personal.html' ),root=path.join(__dirname, '..', '..', '..','client','Personal Info'))
})

router.post('/updateInfo', async function(req,res){
	console.log(req.body);
	
	//console.log(databody);
	//Object.assign(profileInfo,req.body)
	var strSql = "SELECT * FROM customer WHERE id!=? AND username=?"
    let customer = await sqlQuery(strSql, 
        [req.body['id'],req.body['username']]);
	let found = customer && Object.keys(customer).length === 0 && customer.constructor === Object
	if(!found){
		console.log("updating");
		strSql = "UPDATE customer SET username=? WHERE id=?"
		sqlQuery(strSql, 
			[req.body['username'],req.body['id']]);
		console.log("updated");
	}else{
	}

	res.send(req.body);
})

/*router.post('/updateProfilePic', uploadProfilePic.single('chooseProfilePic'), function(req,res){
	var file = req.file;
})*/

router.post('/info',async function(req,res){
	console.log("get profile info");
	console.log(req.body);
	//res.send(req.body);
	var strSql = 'SELECT * FROM customer WHERE id=' + req.body.id;
	//var strSql_2 = 'SELECT * FROM customer WHERE id!=' + req.body.id + ' AND username=' + req.body.username;
	let customer = await sqlQuery(strSql);

	console.log(customer);

    res.json(customer);
})

router.get('/profilePic',function(req,res){
	console.log("get profile picture");
	var strSql = 'SELECT * FROM customer';
	res.send(profilePic);
})

router.get('/testProfile',async function(req,res){
	console.log("show testing data");
	var strSql = 'SELECT * FROM customer';
	let customer_list = await sqlQuery(strSql);
	console.log(customer_list);

    res.json(customer_list);
})

router.post('/updateProfilePic', uploadProfilePic.single('img'), function(req,res){
	var file = req.file;
	console.log(file)
	console.log(req.body.id);
	res.send('success');
})

module.exports = router;