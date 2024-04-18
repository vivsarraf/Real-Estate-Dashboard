## Overview 

### Atractions


This segment of the project creates a web application designed specifically for visualizing a variety of attractions within Toronto. By merging server-side data management with dynamic mapping technologies on the client side, the application aims to offer an intuitive platform for exploring the city’s numerous attractions. It facilitates an understanding of the proximity of these attractions to selected properties, helping users make informed decisions when considering different locations.

#### Key Features:

1. Toronto-Specific Geographical Data Management:
   - This part of the project incorporates Python scripts to handle and manipulate geographical data, specifically focused on Toronto's attractions. These scripts clean and standardize the data, removing extraneous details and ensuring it is formatted correctly for web usage.
   - Once cleaned, the data is loaded into a MongoDB database, which efficiently stores the information and facilitates rapid retrieval based on user queries, such as searching by name, category, postal code, or address

2. Interactive Visualization of Toronto Attractions:
   - Thenon the  client-side functionality, an interactive map of Toronto renders using the Leaflet JavaScript library. This map fetches attraction data from the server via API calls, displaying each location as a clickable marker.
   - Users can click on any marker to reveal a popup that provides detailed information about the attraction.

3. Enhanced User Interaction with Toronto's Map:
 - The web application is designed to load and display all attractions automatically upon visiting the page, offering an immediate overview of what Toronto has to offer. Additional functionalities enable users to search for specific attractions based on various attributes through the server’s responsive API endpoints.

