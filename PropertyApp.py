# Import necessary libraries
from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo 
import json
from bson import json_util, regex
import re

# Creating a Flask application instance
app = Flask(__name__)
# Setting up the connection to a MongoDB database
app.config["MONGO_URI"] = "mongodb://localhost:27017/home"
mongo = PyMongo(app)

# Defining a route to get all properties 
@app.route('/')
def index():
     return render_template("index.html")
       
@app.route('/api/PropertyListings')
def get_PropertyListings():
    # Fetching all property information from collection in the database
   PropertyListings = mongo.db.PropertyListings.find()

 
    # Converting MongoDB cursor to a list
   properties_list = list(PropertyListings)
   
    # Returning the list as JSON
   return jsonify(json.loads(json_util.dumps(properties_list)))

# Runing the app if this script is executed as the main program
if __name__ == '__main__':
    app.run(debug=True)