// Creating the map object
let map = L.map('map', {
  center: [43.6546, -79.3600],  // Coordinates for Toronto
  zoom: 15                      // Initial zoom level for the map
});

// Adding a tile layer using OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);  // Adding the base layer of the map from OpenStreetMap

// Function to fetch stations and add them to the map
function getStations() {
  fetch('/api/subway_stations') // Making a request to the server to get stations data
    .then(response => response.json()) // Parses the response as JSON
    .then(data => {
        addMarkers(data); // Calling function to add markers based on this data
    })
    .catch(error => console.error('Error fetching data:', error)); // Logs errors, if any
}

// // Function to add markers to map
function addMarkers(data) {
  console.log(data);
    for (let i = 0; i < data.length; i++) {
      let station = data[i];
      console.log[station];
      let latitude = station.LAT; 
      let longitude = station.LON; 
        // let latitude = station.Coordinates[0]; 
        // let longitude = station.Coordinates[1]; 
        // let coordinates = station.Coordinates;
      let marker = L.marker([latitude, longitude]).addTo(map);
      marker.bindPopup("<b>" + "Station: " + "</b>" + station.Station + "</b>" + "<br>" + "<b>" + "Address: " + "</b>" + station.Address + "<br>" + "<b>" + "City: " + "</b>" + station.City + "</b>" + 
      "<br>" + "<b>" + "Accessibility: " + "</b>" + station.Accessibility + "<br>" + "<b>" + "Parking Spaces: "+ "</b>" + station.Parking_Spaces + "<br>" + "<b>" + "Average Weekly Ridership: " + "</b>" + station.Ridership_Weekly_Average);
  };
}


// Fetching stations when the page load
document.addEventListener('DOMContentLoaded', getStations);
