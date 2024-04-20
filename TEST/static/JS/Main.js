// Creating the map object
let map = L.map('map', {
  center: [43.6946, -79.3600],  // Coordinates for Toronto
  zoom: 11.5                      // Initial zoom level for the map
});

// Adding a tile layer using OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);  // Adding the base layer of the map from OpenStreetMap

var purpleIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});






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
var marker = L.marker([lat, long],{icon: purpleIcon}).addTo(map);
marker.bindPopup(property.address + "<br>" + property.city);
  }
}




// Function to fetch stations and add them to the map
function getStations() {
  fetch('/api/subway_stations') // Making a request to the server to get stations data
    .then(response => response.json()) // Parses the response as JSON
    .then(data => {
        addStationMarkers(data); // Calling function to add markers based on this data
    })
    .catch(error => console.error('Error fetching data:', error)); // Logs errors, if any
}

// // Function to add markers to map
function addStationMarkers(data) {
  console.log(data);
    for (let i = 0; i < data.length; i++) {
      let station = data[i];
      console.log[station];
      let latitude = station.LAT; 
      let longitude = station.LON; 
      let marker = L.marker([latitude, longitude],{icon: greenIcon}).addTo(map);
      marker.bindPopup("<b>" + "Station: " + "</b>" + station.Station + "</b>" + "<br>" + "<b>" + "Address: " + "</b>" + station.Address + "<br>" + "<b>" + "City: " + "</b>" + station.City + "</b>" + 
      "<br>" + "<b>" + "Accessibility: " + "</b>" + station.Accessibility + "<br>" + "<b>" + "Parking Spaces: "+ "</b>" + station.Parking_Spaces + "<br>" + "<b>" + "Average Weekly Ridership: " + "</b>" + station.Ridership_Weekly_Average);
  };
}





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
  L.geoJSON(data,  {
    onEachFeature: function (feature, layer) {
       //  function to call on each feature before adding it to the map
      if (feature.geometry && feature.geometry.coordinates[0]) {
        // Extracting the latitude and longitude from the GeoJSON coordinates
        const [longitude, latitude] = feature.geometry.coordinates[0];
        // Binding a popup with the attraction details
        layer.bindPopup(getPopupContent(feature.properties));
      }
    }
  }).addTo(map);
}

// Helper function to format popup content
function getPopupContent(properties) {
  return `<b>${properties.NAME}</b><br>
          Address: ${properties.Address}<br>
          Category: ${properties.CATEGORY}<br>
          Phone: ${properties.PHONE}<br>
          <a href="${properties.WEBSITE}" target="_blank">Website</a>`;
}




// Fetching stations when the page load
document.addEventListener('DOMContentLoaded', fetchProperties);
document.addEventListener('DOMContentLoaded', fetchAttractions);
document.addEventListener('DOMContentLoaded', getStations);
