from flask import Flask, jsonify, render_template
from flask_pymongo import PyMongo 
import json
from bson import json_util, regex
import re

#from pymongo import json_util

# Creating a Flask application instance
app = Flask(__name__)
# Setting up the connection to a MongoDB database
app.config["MONGO_URI"] = "mongodb://localhost:27017/toronto-schools"
mongo = PyMongo(app)

# Defining a route to get all properties 

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/toronto_schools')
def get_toronto_schools():
   schools = mongo.db.schools.find()
   return jsonify(list(schools))
  
# Runing the app if this script is executed as the main program
if __name__ == '__main__':
    app.run(debug=True)