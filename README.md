# Toronto Property Search Dashboard

## Overview
The goal of this project is to provide users with an interactive HTML dashboard that provides immediate access to detailed Toronto property information, and local areas of interest such as attractions, schools, and subway stations. It includes several overlay maps with a toggle menu, and a text filter search allowing users to filter the property data by the minimum number of bedrooms to be returned on the map and in the table results. 

The contents of the repo are outlined below:
```
.
├── Data
|   ├── Attractions.geojson                                 # Raw Toronto attractions data presented in geojson format
|   ├── attractions.json                                    # Raw Toronto attractions data presented in json format
|   ├── Cleaned_Attractions.csv                             # Cleaned Toronto attractions data presented in csv format
|   ├── Cleaned_Attractions.json                            # Cleaned Toronto attractions data presented in json format
|   ├── data.json                                           # Raw Toronto property information presented in json format
|   ├── toronto-schools.csv                                 # Raw Toronto school information presented in csv format
|   ├── toronto-schools.json                                # Raw Toronto school information presented in json format
|   └── TTC Subway Stations.xlsx                            # Raw TTC subway stations information presented in excel format
├── static
|   └── css         
|       └──  style.css                                      # Css file used for styling the html dashboard
|   └── JS  
|       └──  Main.js                                        # JavaScript logic for connecting to the Flask App, creating the maps, and populating the tables                 
├── templates
|   └── index.html                                          # Html template for rendering user dashboard with form, table, and maps
├── App.py                                                  # Flask app to create connections to the MongoDB collection and host the server
├── Architecture - Toronto Property Listing Dashboard.png   # PNG image about project architecture
├── Data Cleaning and MongoDB Import.ipynb                  # Jupyter ntoebook file used for importing data and cleaning before MongoDB creation
├── README.md                                               # README file describing purpose, repo contents, setup requirements, and architecture of the project
└── requirements.txt                                        # List of required libraries to install for app to work
```


## Environment and Libraries
Before running the code file, the environment will need to be updated with the relevant packages outlined in the requirements.txt file used for this project. To setup a new environment for this project, please see below:

```
Open a new terminal
Execute 'conda env list' to see whether a suitable environment has already been created for this project. If not, please proceed to the following steps.
Execute 'conda create --name toronto-property-search-dashboard' to create a new conda environment called "toronto-property-search-dashboard." Input 'y' if prompted.
Execute 'conda env list' to confirm whether the 'toronto-property-search-dashboard' environment has been successfully created.
Execute 'conda list' to see the packages already loaded into this environment.
Execute 'pip install -r requirements.txt' to install all the packages within the requriements.txt file. 
```

## Project Architecture
![Architecture - Toronto Property Listing Dashboard](<Architecture - Toronto Property Listing Dashboard.png>)