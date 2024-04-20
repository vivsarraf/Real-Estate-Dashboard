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
