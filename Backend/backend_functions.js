/* require modules */
var express = require('express');
var bodyParser = require('body-parser');
//var session = require('express-session');
var http = require('http');
//var xml2js = require('xml2js');
//var parseString = require('xml2js').parseString;
//var builder = new xml2js.Builder();
var multer = require('multer');
var fs = require('fs');
/* define app to use express */
var app = express();
app.use(bodyParser.urlencoded({extended: true,limit: '50mb',parameterLimit:1000000}));

app.use(express.static('Personal Info'));
//to get xml through post
//var xmlparser = require('express-xml-bodyparser');
app.use(express.json());
//app.use(xmlparser());

/*
app.use(session({
	secret: 'csci2720',
	// cookie: { maxAge: 1000*60*60 } // expire in 1 hour
}));
*/

//app.use('/',express.static('/'));

/* connect to mongodb */

var createFolder = function(folder){
    try{
        fs.accessSync(folder); 
    }catch(e){
        fs.mkdirSync(folder);
    }  
};

var profilePicFolder = './Personal Info/profilePic/';

createFolder(profilePicFolder);

var profileInfo = {id:'exampleID', profileName:'exampleProfileName',email:'exampleEmail@mail.com'};
var profilePic = 'db4obul-5409f57c-4521-448c-bd3d-9ea273e128c2.png';

var profilePicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Personal Info/profilePic/');   
    },
    filename: function (req, file, cb) {
		
		fs.unlink('Personal Info/profilePic/'+profilePic, (err) => {
			if (err) {
			  console.error(err)
			  return
			}
		  });
		var profilePicName =Date.now() + '-'+ file.originalname;
		profilePic = 'profilePic/'+ profilePicName
        cb(null, profilePicName);  
    }
});

var uploadProfilePic = multer({storage: profilePicStorage });

app.all('/*', (req, res,next) => {
	/* set response header */
	res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST");
    res.setHeader("Access-Control-Allow-Headers", "*");
	res.setHeader('Content-Type', 'application/json');
	next();
})



app.get('/menu',function(req, res){
	/*
		var sql = 'SELECT * FROM order';
		connection.query(sql, function(err, result){
	
			if(err){
				console.log('[SELECT ERROR] - ',err.message);
				return;
			  }
			console.log(result);
		})
	*/
	console.log("get here");
	var menu_list = [{"name":'123123123', "status":'open', "price":31},{"name":'cB', "status":'close', "price":231}];
		res.send(JSON.stringify(menu_list));
		//res.send('Hello GET');
	})


app.get('/order',function(req, res){
	/*
		var sql = 'SELECT * FROM order';
		connection.query(sql, function(err, result){
	
			if(err){
				console.log('[SELECT ERROR] - ',err.message);
				return;
			  }
			console.log(result);
		})
	*/
	console.log("get here");
	var response = {"A":10};
		res.send(JSON.stringify(response));
		//res.send('Hello GET');
	})


app.get('/', function (req, res) {
		console.log("主页 GET 请求");
		res.send('Hello GET');
	 })

app.get('/profileInfo',function(req,res){
	console.log("get profile info");
	res.send(JSON.stringify(profileInfo));
})

app.get('/profilePic',function(req,res){
	console.log("get profile picture");
	res.send(profilePic);
})

app.post('/order', function(req,res){

	var databody=req.body.alldata;
	console.log(req.body);
	res.send();
	//res.send('http://localhost:3000');
})

app.post('/menu', function(req,res){

	var databody=req.body.alldata;
	console.log(req.body);
	res.send();
	//res.send('http://localhost:3000');
})

app.post('/updateProfileInfo', function(req,res){

	var databody=req.body.alldata;
	console.log(req.body);
	console.log(databody);
	Object.assign(profileInfo,req.body)
	res.send(JSON.stringify(profileInfo));
})

app.post('/updateProfilePic', uploadProfilePic.single('chooseProfilePic'), function(req,res){
	var file = req.file;
	res.redirect('/personal.html')
})

var server = app.listen(3000, function () {
 
	var host = server.address().address
	var port = server.address().port
   
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
   
  })




