// Creating the map object with initial settings
// Setting the center and zoom level for a map displayed on the webpage
let mainMap = L.map('map', {
  center: [43.6546, -79.3600],  // Central location (Toronto) as a default view
  zoom: 14                      // Initial zoom level for the map
});

// Adding a tile layer using OpenStreetMap
// Loading and displays tile layers on the map, sourced from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mainMap);

// General function to add markers to the map, accommodating different data structures
// Adding clickable markers to the map based on provided data and type (station, attraction, property)
function addMarkers(data, type) {
  data.forEach(item => {
    let lat, long, popupHtml;

    switch (type) {
      case 'station':
        lat = item.LAT;
        long = item.LON;
        popupHtml = `<b>Station: </b>${item.Station}<br><b>Address: </b>${item.Address}<br><b>City: </b>${item.City}<br><b>Accessibility: </b>${item.Accessibility}<br><b>Parking Spaces: </b>${item.Parking_Spaces}<br><b>Average Weekly Ridership: </b>${item.Ridership_Weekly_Average}`;
        break;
      case 'attraction':
        [long, lat] = item.geometry.coordinates;
        popupHtml = `<b>${item.properties.NAME}</b><br>Address: ${item.properties.Address}<br>Category: ${item.properties.CATEGORY}<br>Phone: ${item.properties.PHONE}<br><a href="${item.properties.WEBSITE}" target="_blank">Website</a>`;
        break;
      case 'property':
        lat = item.latitude;
        long = item.longitude;
        popupHtml = `${item.address}<br>${item.city}`;
        break;
    }

    let marker = L.marker([lat, long]).addTo(mainMap);
    marker.bindPopup(popupHtml);
  });
}

// Function to fetch subway stations and add them to the map
// Fetching subway station data from a server and passes it to addMarkers function
function fetchStations() {
  fetch('/api/subway_stations')
    .then(response => response.json())
    .then(data => addMarkers(data, 'station'))
    .catch(error => console.error('Error fetching data:', error));
}

// Function to fetch attractions and add them to the map
// Fetching attraction data from a server and passes it to addMarkers function
function fetchAttractions() {
  fetch('/api/attractions')
    .then(response => response.json())
    .then(data => addMarkers(data, 'attraction'))
    .catch(error => console.error('Error fetching data:', error));
}

// Function to fetch properties and add them to the map
// Fetching property data from a server and passes it to addMarkers function
function fetchProperties() {
  fetch('/api/PropertyListings')
    .then(response => response.json())
    .then(data => addMarkers(data, 'property'))
    .catch(error => console.error('Error fetching data:', error));
}

// Fetching data when the page loads
// Initiating data fetching for stations, attractions, and properties once the webpage is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  fetchStations();
  fetchAttractions();
  fetchProperties();
});
