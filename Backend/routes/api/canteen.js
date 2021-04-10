var express = require('express')
//var bodyParser = require('body-parser')
var sqlQuery = require('../../db')
const multer = require('multer') // v1.0.5
const upload = multer() 


const router = express.Router()
//router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({extended: true, limit: '50mb', parameterLimit:100000}));
router.use(express.json())
router.use(express.static('../../../client/Canteen_Interface_Main_page.html'))

router.all('/*', (req, res, next) => {
	/* set response header */
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST");
	res.setHeader("Access-Control-Allow-Headers", "*");
	res.setHeader('Content-Type', 'application/json');
	next();
})



router.get('/menu', (req, res)=> {

	console.log("get menu");
	var menu_list = [{ "name": '123123123', "status": 'open', "price": 31 }, { "name": 'cB', "status": 'close', "price": 231 }];
	//res.send(JSON.stringify(menu_list));
    res.json(menu_list);
	//res.send('Hello GET');
})

router.get('/order',(req, res)=> {

    var strSql = 'SELECT * FROM order';
    var result = sqlQuery(strSql);

	console.log("get order");
	//var response = { "A": 10 };
    res.json(result);
	//res.send(JSON.stringify(response));
	//res.send('Hello GET');
})


router.post('/menu',upload.array(),(req, res)=>{

    console.log(req.body['sad']);
    res.status(200).send();

})

router.post('/order',  (req, res)=> {

	var databody = req.body.alldata;
	console.log(req.body);
	res.send();
	//res.send('http://localhost:3000');
})


module.exports = router;