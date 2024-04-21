// Initialize all the LayerGroups that we'll use.
let layers = {
  Stations: new L.LayerGroup(),
  Attractions: new L.LayerGroup(),
  Schools: new L.LayerGroup(),
  Properties: new L.LayerGroup() // Add a new LayerGroup for properties
};

// Add a base layer of the map from OpenStreetMap
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the map with our layers.
let map = L.map("map", {
  center: [43.65, -79.3832],
  zoom: 12,
  layers: [
    streetmap,
    layers.Stations,
    layers.Attractions,
    layers.Schools
  ]
});


streetmap.addTo(map);

// Create a control for our layers, and add our overlays to it.
let overlays = {
  "Stations": layers.Stations,
  "Attractions": layers.Attractions,
  "Schools": layers.Schools
};
L.control.layers(null, overlays).addTo(map);


var yellowIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

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
        addMarkers(data); 
        displayDataInTable(data);// Calling function to add markers based on this data
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


function fetchSchools() {
  fetch('/api/toronto_schools') // Making a request to the server to get attractions data
    .then(response => response.json()) // Parses the response as JSON
    .then(data => {
        createSchoolMarkers(data); // Calling function to add markers based on this data
    })
    .catch(error => console.error('Error fetching data:', error)); // Logs errors, if any
}

function createSchoolMarkers(response) {
  //let schoolMarkers = [];
  for (let index = 0; index < response.length; index++) {
      var school = response[index];
      var lat = school.LAT; // Extract latitude from the data
      var long = school.LONG;
      let schoolMarker = L.marker([lat, long],{icon: yellowIcon}).bindPopup("<b>" + "School: " + "</b>" + school.NAME + "</b>" + "<br>" + "<b>" + "Address: " + "</b>" + school.SOURCE_ADDRESS + "<br>" + "<b>" + "City: " + "</b>" + school.CITY + "</b>" + 
      "<br>" + "<b>" + "Postal Code: " + "</b>" + school.POSTAL_CODE + "<br>"+"<b>" + "Municipality: "+ "</b>"  + school.MUNICIPALITY ).addTo(layers.Schools);
      
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
      let marker = L.marker([latitude, longitude],{icon: greenIcon}).addTo(layers.Stations);
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
  }).addTo(layers.Attractions);
}

// Helper function to format popup content
function getPopupContent(properties) {
  return `<b>${properties.NAME}</b><br>
          Address: ${properties.Address}<br>
          Category: ${properties.CATEGORY}<br>
          Phone: ${properties.PHONE}<br>
          <a href="${properties.WEBSITE}" target="_blank">Website</a>`;
}

map.on('overlayadd', function (eventLayer) {
  if (eventLayer.name === 'Schools') {
    fetchSchools();
  }
  if (eventLayer.name === 'Attractions') {
    fetchAttractions();
  }
  if (eventLayer.name === 'Stations') {
    getStations();
  }
});


// Fetching stations when the page load
document.addEventListener('DOMContentLoaded', fetchProperties);

function removeOverlayLayers() {
  Object.values(overlays).forEach(layer => {
    map.removeLayer(layer);
  });
}

// Call the function to remove overlay layers when the DOM content is loaded
document.addEventListener('DOMContentLoaded', removeOverlayLayers);




function displayDataInTable(data) {
  var tbody = document.querySelector('#property-table tbody');
  tbody.innerHTML = ''; // Clear previous data
  data.forEach(property => {
      var row = tbody.insertRow();
      var addressCell = row.insertCell(0);
      var countryCell = row.insertCell(1);
      var postalcodeCell = row.insertCell(2);
      addressCell.textContent = property.address;
      countryCell.textContent = property.city; // Assuming 'city' is the correct field for country
      postalcodeCell.textContent = property.postal_code; // Assuming 'postal_code' is the correct field for postal code
      row.addEventListener('click', function() {
          selectRow(this);
          displayPropertyDetails(property);
      });
  });
}


function selectRow(row) {
  var rows = document.querySelectorAll('#propertyTable tbody tr');
  rows.forEach(r => r.classList.remove('selected'));
  row.classList.add('selected');
}

function displayPropertyDetails(property) {
  var tbody = document.querySelector('#propertyDetails tbody');
  tbody.innerHTML = ''; // Clear previous data
  var row = tbody.insertRow();
  var addressCell = row.insertCell(0);
  var countryCell = row.insertCell(1);
  var postalcodeCell = row.insertCell(2);

  var bedroomCell = row.insertCell(3);
  var bathfullCell = row.insertCell(4);
  var bathhalfCell = row.insertCell(5);

  var cyearCell = row.insertCell(6);
  var denCell = row.insertCell(7);
  

  addressCell.textContent = property.address;
  countryCell.textContent = property.city;
  postalcodeCell.textContent = property.postal_code;

  bedroomCell.textContent = property.bedroom;
  bathfullCell.textContent = property.bathroom_full;
  bathhalfCell.textContent = property.bathroom_half;

  cyearCell.textContent = property.construction_year;
  denCell.textContent = property.den;
 
}
