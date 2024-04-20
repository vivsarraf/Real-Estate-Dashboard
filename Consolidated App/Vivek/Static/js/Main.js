// Creating the map object with initial settings
var map = L.map('map').setView([43.6546, -79.3600], 10);

// Adding a tile layer using OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);  // Adding the base layer of the map from OpenStreetMap

// Function to fetch properties and add them to the map
function fetchProperties() {
  fetch('/api/PropertyListings') // Making a request to the server to get properties data
    .then(response => response.json()) // Parses the response as JSON
    .then(data => {
        addMarkers(data); // Calling function to add markers based on this data
    })
    .catch(error => console.error('Error fetching data:', error)); // Logs errors, if any
}
function addMarkers(data) {
  for (var i = 0; i < data.length; i++) {
var property = data[i];
var lat = property.latitude; // Extract latitude from the data
var long = property.longitude; // Extract longitude from the data
var marker = L.marker([lat, long]).addTo(map);
marker.bindPopup(property.address + "<br>" + property.city);
  }
}

// Fetching attractions when the page load
document.addEventListener('DOMContentLoaded', fetchProperties);
