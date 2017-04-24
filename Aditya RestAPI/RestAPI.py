from flask import Flask, jsonify, url_for, redirect, request
from flask_pymongo import PyMongo
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)
app.config['MONGO_HOST'] = 'localhost'
app.config['MONGO_PORT'] = 27017
app.config["MONGO_DBNAME"] = "students_db"
mongo = PyMongo(app, config_prefix='MONGO')
APP_URL = "http://127.0.0.1:5000"


class Student(Resource):
    def get(self, orderid=None, status=None, orders=None):
        data = []
        items=[]

        if orderid:
            if orderid=="all":
                cursor = mongo.db.student.find({}, {"_id": 0, "update_time": 0})
                
                for i in cursor:
                    #print student
                    #student['url'] = APP_URL + url_for('students') + "/" + student.get('location')
                    data.append(i)

                return jsonify(data)
            else:
                studnet_info = mongo.db.student.find_one({"_id": ObjectId(orderid)}, {"_id": 0})
                if studnet_info:
                    return jsonify(studnet_info)
                else:
                    return {"response": "no order found for {}".format(orderid)}

        elif status:
            cursor = mongo.db.student.find({"status": status}, {"_id": 0})
            for student in cursor:
                #student['url'] = APP_URL + url_for('students') + "/" + student.get('location')
                data.append(student)

            return jsonify(data)

        else:
            
            return {"response": "welcome to Aditya Parmar Restful API written in Python overnight"}

    def post(self):
        
        data = request.get_json()
        if not data:
            data = {"response": "ERROR"}
            return jsonify(data)
        else:
            insid = mongo.db.student.insert(data)
            

        return {"_id" : str(insid),"url":APP_URL+"/orderid/"+str(insid)}

    def put(self, location):
        data = request.get_json()
        mongo.db.student.update({'location': location}, {'$set': data})
        return redirect(url_for("students"))

    def delete(self, orderid):
        print orderid
        if orderid == "all":
            mongo.db.student.delete_many({})
        else:
            mongo.db.student.delete_one({'_id': ObjectId(orderid)})
        #return redirect(url_for("students"))


class Index(Resource):
    def get(self):
        return redirect(url_for("students"))


api = Api(app)
#api.add_resource(Index, "/", endpoint="index")
api.add_resource(Student, "/", endpoint="students")
api.add_resource(Student, "/orderid/<string:orderid>", endpoint="orderid")
api.add_resource(Student, "/status/<string:status>", endpoint="status")

if __name__ == "__main__":
    app.run(debug=True)