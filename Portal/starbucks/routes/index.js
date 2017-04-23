var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Starbucks Order' });
});

router.post('/order', function(req, res, next) {
    var store = req.body.store;
    var items = req.body.items;
    var kongIP = 'http://54.67.94.239:8000'

});

module.exports = router;