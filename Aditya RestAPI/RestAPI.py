from flask import Flask, jsonify, url_for, redirect, request
from flask_pymongo import PyMongo
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)
app.config['MONGO_HOST'] = 'localhost'
app.config['MONGO_PORT'] = 27017
app.config["MONGO_DBNAME"] = "orders_db"
mongo = PyMongo(app, config_prefix='MONGO')
APP_URL = "http://127.0.0.1:5000"


class orders(Resource):
    def get(self, orderid=None, status=None , itemid=None):
        data = []
        items=[]

        if orderid:
            if orderid=="all":
                
            		
            			# Return All Ordered 

		                cursor = mongo.db.orders.find({}, {"_id": 0})
		                
		                for i in cursor:
		                    #print orders
		                    #orders['url'] = APP_URL + url_for('orders') + "/" + orders.get('location')
		                    data.append(i)

		                return jsonify(data)


            

            else:
                
            	
		                
		                studnet_info = mongo.db.orders.find_one({"_id": ObjectId(orderid)}, {"_id": 0})
		                if studnet_info:
		                    return jsonify(studnet_info)
		                else:
		                    return {"response": "no order found for {}".format(orderid)}

  

        else:
            
            return {"response": "welcome to Aditya Parmar Restful API for Starbucks."}

    def post(self):
        
        data = request.get_json()
        if not data:
            data = {"response": "ERROR"}
            return jsonify(data)
        else:
            insid = mongo.db.orders.insert(data)
            

        return {"_id" : str(insid),"url":APP_URL+"/orderid/"+str(insid)}

    def put(self, orderid=None,itemid=None):
        data = request.get_json()
        if(orderid):

        	if(itemid):
        			return {"_id" : str(orderid),"response":"updated item"}
        	else:	
        			mongo.db.orders.update({"_id": ObjectId(orderid)}, {'$set': data})
        			return {"_id" : str(orderid),"response":"updated"}

    def delete(self, orderid=None,itemid=None):
        print orderid

        if orderid == "all":
            mongo.db.orders.delete_many({})
        else:
        		if(itemid):
        					mongo.db.orders.update({"_id": ObjectId(orderid)},{ '$pull':{ "items": {"id" : itemid } } })
        					return {"_id":str(orderid),"itemid":str(itemid),"response":"deleted","message":"An item is deleted."}
        		else:

            				mongo.db.orders.delete_one({'_id': ObjectId(orderid)})
        #return redirect(url_for("orders"))

   

class Index(Resource):
    def get(self):
        return redirect(url_for("orders"))


api = Api(app)
#api.add_resource(Index, "/", endpoint="index")
api.add_resource(orders, "/", endpoint="orders")
api.add_resource(orders, "/orderid/<string:orderid>", endpoint="orderid")
api.add_resource(orders, "/orderid/<string:orderid>/itemid/<string:itemid>", endpoint="itemid")
api.add_resource(orders, "/orderid/<string:orderid>/status/<string:status>", endpoint="status")

if __name__ == "__main__":
    app.run(debug=True)