# Import necessary libraries
from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo 
import json
from bson import json_util, regex
import re

# Creating a Flask application instance
app = Flask(__name__)
# Setting up the connection to a MongoDB database
app.config["MONGO_URI"] = "mongodb://localhost:27017/real_estate_project_db"
mongo = PyMongo(app)

# Defining a route to load the map
@app.route('/')
def index():
    return render_template("index.html")

@app.route('/api/PropertyListings')
def get_PropertyListings():
    # Fetching all property information from collection in the database
   PropertyListings = mongo.db.property_listings_info.find()
    # Converting MongoDB cursor to a list
   properties_list = list(PropertyListings)
    # Returning the list as JSON
   return jsonify(json.loads(json_util.dumps(properties_list)))



@app.route('/api/attractions')
def get_attractions():
    # Fetching all attractions from the 'attractions' collection in the database
    attractions = mongo.db.attractions_info.find()
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
    attractions = mongo.db.attractions_info.find({'properties.CATEGORY': regex_query})
    # Converting the query results to a list and return as JSON
    attractions_list = list(attractions)
    return jsonify(json.loads(json_util.dumps(attractions_list)))

# Defining a route to get attractions by name
@app.route('/api/attractions/name/<name>')
def get_attractions_by_name(name):
    regex_query = regex.Regex('^' + re.escape(name) + '$', 'i')
    attractions = mongo.db.attractions_info.find({'properties.NAME': regex_query})
    attractions_list = list(attractions)
    return jsonify(json.loads(json_util.dumps(attractions_list)))

@app.route('/api/attractions/postalcode/<postalcode>')
def get_attractions_by_postalcode(postalcode):
    attractions = mongo.db.attractions_info.find({'properties.POSTAL_CODE': postalcode})
    attractions_list = list(attractions)
    return jsonify(json.loads(json_util.dumps(attractions_list)))

@app.route('/api/attractions/address/<address>')
def get_attractions_by_address(address):
    regex_query = regex.Regex('^' + re.escape(address) + '$', 'i')
    attractions = mongo.db.attractions_info.find({'properties.Address': regex_query})
    attractions_list = list(attractions)
    return jsonify(json.loads(json_util.dumps(attractions_list)))




@app.route('/api/toronto_schools')
def get_toronto_schools():
   schools = mongo.db.schools_info.find()
   return jsonify(list(schools))




@app.route('/api/subway_stations')
def get_subwaystations():
    stations = mongo.db.subway_stations_info.find()
    # Converting MongoDB cursor to a list
    stations_list = list(stations)
    # Returning the list as JSON
    return jsonify(json.loads(json_util.dumps(stations_list)))

# Runing the app if this script is executed as the main program
if __name__ == '__main__':
    app.run(debug=True)
