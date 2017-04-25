var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Starbucks Order' });
});

router.post('/order', function(req, res, next) {
	var http = require('http');

	var store = req.body.store;
    var item = req.body.item;
    console.log('STORE ' + store + ' ITEM '+item)

	var options = {
	hostname: '54.67.94.239',
	port: '8000',
	method: 'GET',
	headers: {Host: store}/*,
	params: store, item*/
	};

	callback = function(response){
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
	res.redirect('/view');
});

router.post('/view', function(req, res, next) {
	res.redirect('/view');
});

router.get('/view', function(req, res, next) {
  res.render('view', { title: 'Starbucks Orders' });
});

router.post('/change', function(req, res, next) {
	res.redirect('/change');
});

router.get('/change', function(req, res, next) {
  res.render('change', { title: 'Starbucks Orders' });
});

module.exports = router;