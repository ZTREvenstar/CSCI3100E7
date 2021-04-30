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

		var profilePicName = id +".png";
        cb(null, profilePicName);  
    }
});

var uploadProfilePic = multer({
	storage: profilePicStorage, 
    fileFilter: function(_req, file, cb){
        checkFileType(file, cb);
    }
}).single('img');

function checkFileType(file, cb){
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);
  
	if(mimetype && extname){
	  return cb(null,true);
	} else {
		return cb(null,false);
	}
  }
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
	//console.log(req.body);
	
	//console.log(databody);
	//Object.assign(profileInfo,req.body)
	if(req.body.id==null || req.body.id == ""){
		res.send("error, invalid id");
	}else if(req.body.username==null || req.body.username == ""){
		res.send("error, invalid new username");
	}else{
		var strSql = "SELECT * FROM customer WHERE id!=? AND username=?"
		let customer = await sqlQuery(strSql, 
			[req.body['id'],req.body['username']]);

		if(customer.length>0){
			res.send("error, username already exist")
		}else{
			console.log("updating");
			strSql = "UPDATE customer SET username=? WHERE id=?"
			let result = await sqlQuery(strSql, 
				[req.body['username'],req.body['id']]);
			if(result.affectedRows==0){
				res.send("error, id does not exist")
			}else{
				res.send("success");
			}
		}	
	}
})

router.post('/updatePW', async function(req,res){
	if(req.body.id==null || req.body.id == ""){
		res.send("error, invalid id");
	}else if(req.body.pw==null || req.body.pw == ""){
		res.send("error, invalid new password");
	}else{
		//	console.log("updating");
			strSql = "UPDATE customer SET password=? WHERE id=?"
			let result = await sqlQuery(strSql, 
				[req.body['pw'],req.body['id']]);
			if(result.affectedRows==0){
				res.send("error, id does not exist")
			}else{
				console.log("updated");
				res.send("success");
			}
	}
})

/*router.post('/updateProfilePic', uploadProfilePic.single('chooseProfilePic'), function(req,res){
	var file = req.file;
})*/

router.post('/info',async function(req,res){
	//res.send(req.body);
	if(req.body.id==null || req.body.id == ""){
		res.send("error, invalid id");
	}else{
		var strSql = 'SELECT * FROM customer WHERE id=' + req.body.id;
		//var strSql_2 = 'SELECT * FROM customer WHERE id!=' + req.body.id + ' AND username=' + req.body.username;
		let result = await sqlQuery(strSql);
		if(result==null||result.length == 0||result=={}){
			res.send("error, id does not exist")
		}else{
			res.send(result)
			//console.log(result)
		}
	}
})

router.post('/updateProfilePic', uploadProfilePic, function(req,res){
		
	var file = req.file;
	console.log(file)
	if(file!=null && file!={}){
		res.send("success");
	}else{
		res.send("error, your file has an incompatible file extension");
	}
	
})

module.exports = router;