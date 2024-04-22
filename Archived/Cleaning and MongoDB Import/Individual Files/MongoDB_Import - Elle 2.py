# Importing necessary libraries
from pymongo import MongoClient
import json
import os

def main():
    # MongoDB connection parameters
    host = 'localhost'  # The server address where MongoDB is running
    port = 27017         # The port on which MongoDB listens
    dbname = 'myDatabase' # The name of the database to connect to
    collection_name = 'attractions'  # The name of the collection to insert data into

    # Path to the cleaned JSON file
    input_json_path = os.path.join('Resources', 'Cleaned_Attractions.json')

    # Connect to MongoDB
    client = MongoClient(host, port)  # Create a MongoDB client
    db = client[dbname]               # Select the database
    collection = db[collection_name]  # Select the collection

    # Loading the cleaned JSON data
    with open(input_json_path, 'r') as file:  # Opening the JSON file for reading
        data = json.load(file)  # Loading JSON data from file
        # Extracting 'features' from data assuming it is structured for GeoJSON
        features = data.get('features', [])
        documents = [feature for feature in features]

    # Inserting documents into the collection
    collection.insert_many(documents) # Inserting all documents into the MongoDB collection
    print(f"Data has been imported to MongoDB collection '{collection_name}' in database '{dbname}'.")

    # Closing the connection to MongoDB
    client.close()

if __name__ == '__main__':
    main()
