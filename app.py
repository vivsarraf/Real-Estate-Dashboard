import json
import pymongo
from pymongo import MongoClient
from flask import Flask


# Use flask_pymongo to set up mongo connection
app = Flask(__name__)
client = pymongo.MongoClient("mongodb://localhost:27017")
db = client['property_information_db']
collection = db['ttc_subway_stations']

@app.route("/")
def stations():
    documents = collection.find()
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    return json.dumps(response)
    # print([i for i in mongo.db.ttc_subway_stations.find({})])
    # return [i for i in mongo.db.ttc_subway_stations.find({})]

if __name__ == "__main__":
    app.run(debug=True)





# # 1. import Flask
# from flask import Flask

# # 2. Create an app, being sure to pass __name__
# app = Flask(__name__)


# # 3. Define what to do when a user hits the index route
# @app.route("/")
# def home():
#     print("Server received request for 'Home' page...")
#     return "Welcome to my 'Home' page!"


# # 4. Define what to do when a user hits the /about route
# @app.route("/about")
# def about():
#     print("Server received request for 'About' page...")
#     return "Welcome to my 'About' page!"


# if __name__ == "__main__":
#     app.run(debug=True)
