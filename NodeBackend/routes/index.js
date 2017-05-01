
/*
 * GET home page.
 */
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/Restbucks";
//var mongoURL="mongodb://54.193.62.123:27017/Restbucks";
var mongow = require('mongodb-wrapper')

exports.index = function(req, res){
    res.render('index', { title:'HI'});
};

exports.createOrder = function (req,res) {
    console.log("DATA:"+req.body.restbucks11.coffee);
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);

        var coll = mongo.collection('order');
        coll.insert({location:"Palo Alto",items:[{name:req.body.restbucks11.coffee,milk:req.body.restbucks11.milk,size:req.body.restbucks11.size}]}, function(err, user){
            var json_res;
            if (user) {
                json_res = {"statusCode" : 200,"id":user};
            } else {
                console.log("returned false login");
                json_res = {"statusCode" : 401};
            }
            console.log("RESPONSE"+json_res);
              res.send(json_res);
        });
    });
  //  res.redirect('/getOrders');
};

exports.create = function(req, res){
    res.render('create', { title:'HI'});
};

exports.updateOrder = function(req, res){
    console.log(req.param('id'));
    res.render('update', { title:'HI'});
};

exports.update = function (req,res) {
    mongo.connect(mongoURL, function(){

        console.log('Connected to mongo at: ' + mongoURL);

        var coll = mongo.collection('order');


        var x=mongow.ObjectID(req.param('id'));
        coll.update({_id:x},{$set:{
            location:"Palo Alto",
            items:[{name:req.param('restbucks11.coffee'),milk:req.param('restbucks11.milk'),size:req.param('restbucks11.size')}],

        }}, function(err, user){

            if (user) {
                console.log(user);
                res.send({"statusCode" : 200,"order":user});
            } else {
                console.log("returned false login");
                res.send({"statusCode" : 404});
            }
        });
    });
}

exports.getOrder = function (req,res) {
    mongo.connect(mongoURL, function(){

        console.log('Connected to mongo at: ' + mongoURL);

        var coll = mongo.collection('order');


        var x=mongow.ObjectID(req.param('id'));
        coll.find({_id:x}, function(err, user){

            if (user) {

            } else {

                console.log("returned false login");
            }

            //  res.send(json_res);

        });



    });
}
exports.deleteOrder = function(req, res){
    console.log(req.param('id'));

    mongo.connect(mongoURL, function(){

        console.log('Connected to mongo at: ' + mongoURL);

        var coll = mongo.collection('order');


        var x=mongow.ObjectID(req.param('id'));
        coll.remove({_id:x}, function(err, user){

            if (user) {
            } else {

                console.log("returned false login");
            }

          //  res.send(json_res);

        });



    });
    res.redirect('/getOrders');
};

exports.getOrders = function(req,res) {
    res.render('orders',{ title:'ALL ORDERS'});
};

exports.getAllOrders=function(req,res) {
    var json_res={};



    mongo.connect(mongoURL, function(){

        console.log('Connected to mongo at: ' + mongoURL);

        var coll = mongo.collection('order');



        coll.find({"location":"Palo Alto"}).toArray( function(err, user){

            if (user) {

                // This way subsequent requests will know the user is logged in.

                /*req.session.username = user.username;*/
                console.log(user.length +" is the session");

                json_res = {"statusCode" : 200,"orders":user};



            } else {

                console.log("returned false login");

                json_res = {"statusCode" : 401};

            }

            res.send(json_res);

        });



    });

};