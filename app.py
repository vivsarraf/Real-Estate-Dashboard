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

# Defining a route to get all properties 
@app.route('/')
def index():
    return (
        f"/api/subway_stations"          
             )

@app.route('/api/subway_stations')
def get_SubwayStations():
    # Fetching all property information from collection in the database
   ttc_subway_stations = mongo.db.subway_stations_info.find()

    # Converting MongoDB cursor to a list
   station_list = list(ttc_subway_stations)
   
    # Returning the list as JSON
   return jsonify(json.loads(json_util.dumps(station_list)))

# Runing the app if this script is executed as the main program
if __name__ == '__main__':
    app.run(debug=True)
