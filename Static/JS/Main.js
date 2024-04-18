// Creating the map object with initial settings
let AddressMap = L.map('map', {
  center: [43.6546, -79.3565],  // Coordinates for Toronto
  zoom: 14                      // Initial zoom level for the map
});

// Adding a tile layer using OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(AddressMap);  // Adding the base layer of the map from OpenStreetMap

// Function to fetch attractions and add them to the map
function fetchAttractions() {
  fetch('/api/attractions') // Making a request to the server to get attractions data
    .then(response => response.json()) // Parses the response as JSON
    .then(data => {
        addMarkersToMap(data); // Calling function to add markers based on this data
    })
    .catch(error => console.error('Error fetching data:', error)); // Logs errors, if any
}

// Function to add markers to the map using GeoJSON data
function addMarkersToMap(data) {
  L.geoJSON(data, {
    onEachFeature: function (feature, layer) {
       //  function to call on each feature before adding it to the map
      if (feature.geometry && feature.geometry.coordinates[0]) {
        // Extracting the latitude and longitude from the GeoJSON coordinates
        const [longitude, latitude] = feature.geometry.coordinates[0];
        // Binding a popup with the attraction details
        layer.bindPopup(getPopupContent(feature.properties));
      }
    }
  }).addTo(AddressMap);
}

// Helper function to format popup content
function getPopupContent(properties) {
  return `<b>${properties.NAME}</b><br>
          Address: ${properties.Address}<br>
          Category: ${properties.CATEGORY}<br>
          Phone: ${properties.PHONE}<br>
          <a href="${properties.WEBSITE}" target="_blank">Website</a>`;
}

// Fetching attractions when the page load
document.addEventListener('DOMContentLoaded', fetchAttractions);
