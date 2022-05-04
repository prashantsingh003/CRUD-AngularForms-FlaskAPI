from urllib import response
from flask import Flask,jsonify,Response, make_response,request
from pymongo import MongoClient
from bson.objectid import ObjectId

app=Flask(__name__)

mongo=MongoClient('mongodb://localhost:27017')
db=mongo.angular_practice
col=db.practice

@app.route('/',methods=['POST'])
def create_post():
    req_data=request.get_json()
    if(col.find_one({"title":req_data['title']})):
       response = make_response(
                jsonify(
                    {"message": str('title already exists')}
                )
            )
    else:
        dbResponce=col.insert_one({"title":req_data['title'],"content":req_data['content']})
        response = make_response(
                    jsonify(
                        {"id": str(dbResponce.inserted_id), "title": str(req_data['title'])}
                    ),201
                )
    response.headers["Content-Type"] = "application/json"
    response.headers['Access-Control-Allow-Methods']='*'
    response.headers['Access-Control-Allow-Origin']='*'
    response.headers['Vary']='Origin'
    return response

@app.route('/',methods=['GET'])
def get_posts():
    posts=list(col.find())
    for post in posts:
        post['_id']=str(post['_id'])
    response=make_response(jsonify(posts))
    response.headers['Content-Type']='application/json'
    return response

@app.route('/',methods=['DELETE'])
def delete_all():
    col.delete_many({})
    response = make_response(
                jsonify(
                    {"message": "All_Posts_Deleted"}
                ),
                200
            )
    response.headers["Content-Type"] = "application/json"
    return response

if(__name__=='__main__'):
    app.run(debug=True)
