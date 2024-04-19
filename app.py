# Import necessary libraries
from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo 
import json
from bson import json_util, regex
import re


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
