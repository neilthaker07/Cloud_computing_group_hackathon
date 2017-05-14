
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
app.get('/v3/starbucks/orders',routes.index1);
app.get('/v3/starbucks/orders1',routes.index2);
app.post('/createOrder',function (req, res,next) {
console.log('inside server script');
  console.log('body of req'+req.body.length);
  console.log(req.body.location.replace(/\s/g,""));
  var data=JSON.stringify(req.body);

  var options = {
    hostname: '54.67.94.239',
    port: '8000',
   path : '/v3/starbucks/order',
    method: 'POST',
    headers: {Host: req.body.location.replace(/\s/g,""),
              'Content-Type':'application/json'
             }
  };

  callback = function(response){
    var str = '';
    response.setEncoding('utf-8');
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
        //success(JSON.parse(str));
    });
  }
  var req=http.request(options, callback);
  req.write(data);
  req.end();
  res.send({"statusCode":200});
  //res.render(str);
});
app.post('/orders1',function (req,res) {
  console.log('inside server script for get all orders');
  console.log(req.body.location);
  //var data=JSON.stringify(req.body);

  var options = {
    hostname: '54.67.94.239',
    port: '8000',
    path : '/v3/starbucks/orders',
    method: 'GET',
    headers: {Host: req.body.location.replace("%20",""),
      'Content-Type':'application/json'
    }
  };
var x;
  callback = function(response){
    var str = '';
    response.setEncoding('utf-8');
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
      x=JSON.parse(str);
      console.log("X");
      console.log(x);
      res.send({"statusCode":200,"orders":x});

      //success(JSON.parse(str));
    });
  }
  var req=http.request(options, callback);

  req.end();
  console.log("BEFORE RES");
  console.log(x);
  //res.send({"statusCode":200,"orders":x});
});
app.post('/updateOrder',function (req,res) {
  console.log('inside server script for get all orders');
  console.log(req.body.location);
  //var data=JSON.stringify(req.body);
  //console.log(req.body.id)
  var options = {
    hostname: '54.67.94.239',
    port: '8000',
    path : '/v3/starbucks/orders',
    method: 'PUT',
    headers: {Host: req.body.location.replace("%20",""),
      'Content-Type':'application/json'
    }
  };
  var x;
  callback = function(response){
    var str = '';
    response.setEncoding('utf-8');
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
      x=JSON.parse(str);
      console.log("X");
      console.log(x);
      //success(JSON.parse(str));
    });
  }
  var req=http.request(options, callback);

  req.end();
  res.send({"statusCode":200,"orders":x});
});
app.post('/deleteOrder',function (req,res) {
  console.log('inside server script for get all orders');
  console.log(req.param('id')+"    "+req.body.location);
  var options = {
    hostname: '54.67.94.239',
    port: '8000',
    path : '/v3/starbucks/order/'+req.param('id'),
    method: 'DELETE',
    headers: {Host: req.body.location.replace("%20",""),
      'Content-Type':'application/json'
    }
  };
  var x=req.param('id');
  callback = function(response){
    var str = '';
    response.setEncoding('utf-8');
    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str+=chunk;
      console.log(str);
      console.log("ON RESPONSE");
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      console.log("END RESPONSE");
      //success(JSON.parse(str));
    });
  }
  var req=http.request(options, callback);
  //req.write(x);
  req.end();
  res.send({"statusCode":200});
});
app.get('/updateOrder',routes.index3);
app.post('/getOrder',function (req,res) {
  console.log('inside server script for get all orders');
  console.log(req.body.location);
  //var data=JSON.stringify(req.body);

  var options = {
    hostname: '54.67.94.239',
    port: '8000',
    path : '/v3/starbucks/order/'+req.param('id'),
    method: 'GET',
    headers: {Host: req.body.location.replace("%20",""),
      'Content-Type':'application/json'
    }
  };
  var x;
  callback = function(response){
    var str = '';
    response.setEncoding('utf-8');
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
      x=JSON.parse(str);
      console.log("X");
      console.log(x);
      res.send({"statusCode":200,"orders":x});

      //success(JSON.parse(str));
    });
  }
  var req=http.request(options, callback);

  req.end();
  console.log("BEFORE RES");
  console.log(x);
  //res.send({"statusCode":200,"orders":x});
});
app.post('/update',function (req, res,next) {
  console.log('inside server script');
  console.log('body of req'+req.body.length);
  console.log(req.body.location.replace(/\s/g,""));
  //var data=JSON.stringify(req.body.restbucks11);
  var data={"location":"San Jose","items":[{"qty":1,"name":"Latte","milk":"Whole milk","size":"Short 8oz"}]};
console.log("DATA");
  console.log(data);
  var options = {
    hostname: '54.67.94.239',
    port: '8000',
    path : '/v3/starbucks/order/'+req.body.id,
    method: 'PUT',
    headers: {Host: req.body.location.replace(/\s/g,""),
      'Content-Type':'application/json'
    }
  };

  callback = function(response){
    var str = '';
    response.setEncoding('utf-8');
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
      //success(JSON.parse(str));
    });
  }
  var req=http.request(options, callback);
  req.write(JSON.stringify(data));
  req.end();
  res.send({"statusCode":200});
  //res.render(str);
});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
