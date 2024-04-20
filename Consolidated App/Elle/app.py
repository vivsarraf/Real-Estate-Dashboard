# Import necessary libraries
from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo 
import json
from bson import json_util, regex
import re

# Creating a Flask application instance
app = Flask(__name__)
# Setting up the connection to a MongoDB database
app.config["MONGO_URI"] = "mongodb://localhost:27017/myDatabase"
mongo = PyMongo(app)

# Defining a route to get all attractions
@app.route('/')
def index():
    return render_template("index.html")

@app.route('/api/attractions')
def get_attractions():
    # Fetching all attractions from the 'attractions' collection in the database
    attractions = mongo.db.attractions.find()
    # Converting MongoDB cursor to a list
    attractions_list = list(attractions)
    # Returning the list as JSON
    return jsonify(json.loads(json_util.dumps(attractions_list)))

# Defining a route to get attractions by category
@app.route('/api/attractions/category/<category>')
def get_attractions_by_category(category):
    # Preparing a regex to make the search case insensetive
    regex_query = regex.Regex('^' + re.escape(category) + '$', 'i')
    # Query the database for attractions that match the category
    attractions = mongo.db.attractions.find({'properties.CATEGORY': regex_query})
    # Converting the query results to a list and return as JSON
    attractions_list = list(attractions)
    return jsonify(json.loads(json_util.dumps(attractions_list)))

# Defining a route to get attractions by name
@app.route('/api/attractions/name/<name>')
def get_attractions_by_name(name):
    regex_query = regex.Regex('^' + re.escape(name) + '$', 'i')
    attractions = mongo.db.attractions.find({'properties.NAME': regex_query})
    attractions_list = list(attractions)
    return jsonify(json.loads(json_util.dumps(attractions_list)))

@app.route('/api/attractions/postalcode/<postalcode>')
def get_attractions_by_postalcode(postalcode):
    attractions = mongo.db.attractions.find({'properties.POSTAL_CODE': postalcode})
    attractions_list = list(attractions)
    return jsonify(json.loads(json_util.dumps(attractions_list)))

@app.route('/api/attractions/address/<address>')
def get_attractions_by_address(address):
    regex_query = regex.Regex('^' + re.escape(address) + '$', 'i')
    attractions = mongo.db.attractions.find({'properties.Address': regex_query})
    attractions_list = list(attractions)
    return jsonify(json.loads(json_util.dumps(attractions_list)))

# Runing the app if this script is executed as the main program
if __name__ == '__main__':
    app.run(debug=True)