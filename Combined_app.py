# Import necessary libraries
from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo
import json
from bson import json_util, regex
import re

# Creating a single Flask application instance
app = Flask(__name__)

# Getting all the data from real_estate_project_db
app.config["MONGO_URI"] = "mongodb://localhost:27017/real_estate_project_db"
mongo = PyMongo(app)

# Defining a route to load the map
@app.route('/')
def index():
    return render_template("index.html")

# Route to fetch subway stations data
@app.route('/api/subway_stations')
def get_subway_stations():
    stations = mongo.db.subway_stations_info.find()
    stations_list = list(stations)
    return jsonify(json.loads(json_util.dumps(stations_list)))

# Route to fetch all attractions
@app.route('/api/attractions')
def get_attractions():
    attractions = mongo.db.attractions.find()
    attractions_list = list(attractions)
    return jsonify(json.loads(json_util.dumps(attractions_list)))

# Route to fetch attractions by category
@app.route('/api/attractions/category/<category>')
def get_attractions_by_category(category):
    regex_query = regex.Regex('^' + re.escape(category) + '$', 'i')
    attractions = mongo.db.attractions.find({'properties.CATEGORY': regex_query})
    attractions_list = list(attractions)
    return jsonify(json.loads(json_util.dumps(attractions_list)))

# Route to fetch attractions by name
@app.route('/api/attractions/name/<name>')
def get_attractions_by_name(name):
    regex_query = regex.Regex('^' + re.escape(name) + '$', 'i')
    attractions = mongo.db.attractions.find({'properties.NAME': regex_query})
    attractions_list = list(attractions)
    return jsonify(json.loads(json_util.dumps(attractions_list)))

# Route to fetch attractions by postal code
@app.route('/api/attractions/postalcode/<postalcode>')
def get_attractions_by_postalcode(postalcode):
    attractions = mongo.db.attractions.find({'properties.POSTAL_CODE': postalcode})
    attractions_list = list(attractions)
    return jsonify(json.loads(json_util.dumps(attractions_list)))

# Route to fetch attractions by address
@app.route('/api/attractions/address/<address>')
def get_attractions_by_address(address):
    regex_query = regex.Regex('^' + re.escape(address) + '$', 'i')
    attractions = mongo.db.attractions.find({'properties.Address': regex_query})
    attractions_list = list(attractions)
    return jsonify(json.loads(json_util.dumps(attractions_list)))

# Route to fetch all property listings
@app.route('/api/PropertyListings')
def get_property_listings():
    properties = mongo.db.PropertyListings.find()
    properties_list = list(properties)
    return jsonify(json.loads(json_util.dumps(properties_list)))

# Running the app if this script is executed as the main program
if __name__ == '__main__':
    app.run(debug=True)
