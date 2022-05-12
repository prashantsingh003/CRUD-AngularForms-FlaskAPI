from flask import Flask,jsonify,Response, make_response,request
from flask_restful import Api, Resource, reqparse
from numpy import require
from pymongo import MongoClient
from bson.objectid import ObjectId

app=Flask(__name__)
api=Api(app)

mongo=MongoClient('mongodb://localhost:27017')
db=mongo.angular_practice
col=db.practice

class Home(Resource):
    def get(self):
        if(request.args):
            params=request.args
            print('\n',dict(params),'\n')
        else:
            print("*****NO_PARAMS*****")

        posts=list(col.find())
        for post in posts:
            post['_id']=str(post['_id'])
        response=make_response(jsonify(posts))
        response.headers['Content-Type']='application/json'
        return response

    def delete(self):
        col.delete_many({})
        response = make_response(
                    jsonify(
                        {"message": "All_Posts_Deleted"}
                    ),
                    200
                )
        response.headers["Content-Type"] = "application/json"
        return response
    
    def post(self):
        # managing the data recieved
        post_args=reqparse.RequestParser()
        post_args.add_argument("title", type= str, help='Title is required' )
        post_args.add_argument('content', type= str, help='Post Content is required',required=True)
        args=post_args.parse_args()

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
                            {"id": str(dbResponce.inserted_id), "title": str(req_data['title']), "args":args}
                        ),201
                    )
        response.headers["Content-Type"] = "application/json"
        response.headers['Access-Control-Allow-Methods']='*'
        response.headers['Access-Control-Allow-Origin']='*'
        response.headers['Vary']='Origin'
        return response

api.add_resource(Home,'/')

if(__name__=='__main__'):
    app.run(debug=True)
