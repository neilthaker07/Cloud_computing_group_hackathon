var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Starbucks Order' });
});

router.post('/order', function(req, res, next) {
    var kongIP = 'http://54.67.94.239:8000'
    //req.redirect(kongIP)

	var http = require('http');

	var dict = [];
	dict.push({
    	key: "Host",
    	value: "pa"
	});

	var options = {
	hostname: '54.67.94.239',
	port: '8000',
	method: 'GET',
	headers: dict
	};

	callback = function(response) {
	  var str = '';

	  //another chunk of data has been recieved, so append it to `str`
	  response.on('data', function (chunk) {
	    str += chunk;
	  });

	  //the whole response has been recieved, so we just print it out here
	  response.on('end', function () {
	    console.log(str);
	  });
	}

	http.request(options, callback).end();
});

module.exports = router;