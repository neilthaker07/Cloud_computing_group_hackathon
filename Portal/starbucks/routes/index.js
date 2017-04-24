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
	var data = JSON.stringify({
		'location': 'SF',
		'items': {'name':'first', 'size':'5'}
	});

	var options = {
	  host: '54.67.94.239',
	  port: '8000',
	  method: 'GET',
	  headers: {
	    'Content-Type': 'application/json; charset=utf-8',
	    'Content-Length': data.length
	  }
	};

	  var req1 = http.request(options, function(res) {
	  var msg = '';

	  res.setEncoding('utf8');
	  res.on('data', function(chunk) {
	    msg += chunk;
	  });
	  res.on('end', function() {
	    console.log(JSON.parse(msg));
	  });
	});

	req1.write(data);
	req1.end();

});

module.exports = router;