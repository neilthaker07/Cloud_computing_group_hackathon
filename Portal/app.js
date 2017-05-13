
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var bodyParser=require('body-parser');
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/orders',function (req,res) {
  res.render('viewAll',{ title: 'ALL ORDERS'});
});
app.post('/createOrder',function (req, res,next) {
console.log('inside server script');
  console.log('body of req'+req.body.length);
  console.log(req.body);
  var data=JSON.stringify(req.body);

  var options = {
    hostname: '54.67.94.239',
    port: '8000',
    path : '/v3/starbucks/order',
    method: 'POST',
    headers: {Host: 'sj',
              'Content-Type':'application/json'
             },
    data:{"location":"San Jose"},
    json:true/*,
    //json:{"location":"San Francisco","items":[{"id":1,"name":"Cappuccino","milk":"2% milk","size":"Short 8oz"}]}

    // params: store, item*/
  };

  callback = function(response){
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      console.log("ON RESPONSE");
      console.log(""+chunk);
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
      response.on('end', function () {
      console.log("END RESPONSE");
      console.log(str);
    });
  }
  http.request(options, callback).end();
  res.send({"statusCode":200});
  //res.render(str);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
