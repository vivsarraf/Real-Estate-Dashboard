function create_map(){

}

// Initialize all the LayerGroups that we'll use. 4 total, 1 each for Stations, Attractions, Schools, and Properties. 
let layers = {
  Stations: new L.LayerGroup(),
  Attractions: new L.LayerGroup(),
  Schools: new L.LayerGroup(),
  Properties: new L.LayerGroup() 
};

// Add a base layer of the map from OpenStreetMap
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

let baseMaps = {
  Street: streetmap,
  Topography: topo
};

// Create the map with our layers.
let map = L.map("map", {
  //Center around Toronto and set zoom
  center: [43.73, -79.3832],
  zoom: 11.5,
  layers: [
    streetmap,
    layers.Stations,
    layers.Attractions,
    layers.Schools
  ]
});
// Add the streetmap to our map.
streetmap.addTo(map);

// Create a control for toggling our layers on and off, and add our overlays to it.
let overlays = {
  "Stations": layers.Stations,
  "Attractions": layers.Attractions,
  "Schools": layers.Schools
};
// Add the layer control to our map.
L.control.layers(baseMaps, overlays).addTo(map);

// Attractions will use the default blue markers, so different markers will have to be creater for the other layers on the map.
// Create a yellow marker to be used for the schools' markers. 
// Defined properties include icon image, shadow image, size, anchor point, popup size when selected, and shadow size. 
var yellowIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Create a purple marker to be used for the properties' markers. 
// Defined properties include icon image, shadow image, size, anchor point, popup size when selected, and shadow size. 
var purpleIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Create a green marker to be used for the ttc subway stations' markers. 
// Defined properties include icon image, shadow image, size, anchor point, popup size when selected, and shadow size. 
var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Create function to fetch properties data from the Flask App based on the filter criteria
function fetchProperties(filters) {
  console.log(filters)
  removeOverlayLayers()
  // Make a request to the Flask server to get properties data
  fetch('/api/PropertyListings', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'bedroom': parseInt(filters["bedroom"])})
  }) 
    // Parse the response as JSON
    .then(response => response.json()) 
    .then(data => {
      // Call the function to add markers for the filtered properties data
      addPropertyMarkers(data); 
      // Show the filtered data in the table below the map
      displayDataInTable(data);
    })
    // Logs errors, if any
    .catch(error => console.error('Error fetching data:', error)); 
}




var markers = [];

// Create function to add Property markers based on the data fetched from the Flask App
function addPropertyMarkers(data) {
  // loop through existing markets and remove
  for (var i=0; i<markers.length; i++) {
    map.removeLayer(markers[i]);
  }
  markers = []
  // Loop through each item in the JSON data
  for (var i = 0; i < data.length; i++) {
    // Assign the item to a variable
    var property = data[i];
    // Extract the latitude from the property information and assign it to a variable
    var lat = property.latitude;
    // Extract the longitude from the property information and assign it to a variable
    var long = property.longitude; 
    // Create a marker based on the latitude and longitude variables, 
    // Set the icon to the purple marker created above, and add the marker to the map
    var marker = L.marker([lat, long],{icon: purpleIcon}).addTo(map);

    markers.push(marker);

    // Add the property information to be shown in the pop-up when a marker is clicked
    marker.bindPopup("<b>" + "Address: " + "</b>" + property.address + "<br>" + "<b>" + "City: " + "</b>" + property.city + "<br>" + "<b>" + "Bedrooms: " + "</b>" + property.bedroom + 
                    "<br>" + "<b>" + "Price: " + "</b>" + property.estimate_list_price + "<br>" + "<b>" + "Construction Year: " + "</b>" + property.construction_year);
  }
}

// Create function to fetch school data from the Flask App
function fetchSchools() {
  // Make a request to the Flask server to get the schools data
  fetch('/api/toronto_schools') 
    // Parse the response as JSON
    .then(response => response.json())
    .then(data => {
      // Call the function to add markers for the schools data
      addSchoolMarkers(data); 
    })
    // Logs errors, if any
    .catch(error => console.error('Error fetching data:', error)); 
}

// Create function to add school markers based on the data fetched from the Flask App
function addSchoolMarkers(response) {
  // Loop through each item in the JSON data
  for (let index = 0; index < response.length; index++) {
    // Assign the item to a variable
    var school = response[index];
    // Extract the latitude from the school information and assign it to a variable
    var lat = school.LAT; 
    // Extract the longitude from the school information and assign it to a variable
    var long = school.LONG;
    // Create a marker based on the latitude and longitude variables, 
    // Set the icon to the yellow marker created above, and
    // Add the school information to be shown in the pop-up when a marker is clicked
    // Add the markers to the Schools layer
    var schoolMarker = L.marker([lat, long],{icon: yellowIcon}).bindPopup("<b>" + "School: " + "</b>" + school.NAME + "</b>" + "<br>" + "<b>" + "Address: " + "</b>" + school.SOURCE_ADDRESS + "<br>" + "<b>" + "City: " + "</b>" + school.CITY + "</b>" + 
      "<br>" + "<b>" + "Postal Code: " + "</b>" + school.POSTAL_CODE + "<br>"+"<b>" + "Municipality: "+ "</b>"  + school.MUNICIPALITY ).addTo(layers.Schools); 
  }
}

// Create function to fetch subway stations data from the Flask App
function fetchStations() {
  // Make a request to the Flask server to get the stations data
  fetch('/api/subway_stations') 
    // Parse the response as JSON
    .then(response => response.json()) 
    .then(data => {
      // Call the function to add markers for the stations data
      addStationMarkers(data);
    })
    // Logs errors, if any
    .catch(error => console.error('Error fetching data:', error)); 
}

// Create function to add station markers based on the data fetched from the Flask App
function addStationMarkers(data) {
  // Loop through each item in the JSON data
    for (let i = 0; i < data.length; i++) {
      // Assign the item to a variable
      var station = data[i];
      // Extract the latitude from the station information and assign it to a variable
      var latitude = station.LAT; 
      // Extract the longitude from the station information and assign it to a variable
      var longitude = station.LON; 
      // Create a marker based on the latitude and longitude variables, 
      // Set the icon to the green marker created above, and
      // Add the station information to be shown in the pop-up when a marker is clicked
      // Add the markers to the Stations layer
      var marker = L.marker([latitude, longitude],{icon: greenIcon}).addTo(layers.Stations);
      marker.bindPopup("<b>" + "Station: " + "</b>" + station.Station + "</b>" + "<br>" + "<b>" + "Address: " + "</b>" + station.Address + "<br>" + "<b>" + "City: " + "</b>" + station.City + "</b>" + 
      "<br>" + "<b>" + "Accessibility: " + "</b>" + station.Accessibility + "<br>" + "<b>" + "Parking Spaces: "+ "</b>" + station.Parking_Spaces + "<br>" + "<b>" + "Average Weekly Ridership: " + "</b>" + station.Ridership_Weekly_Average);
  };
}

// Create function to fetch attractions data from the Flask App
function fetchAttractions() {
  // Make a request to the Flask server to get the attractions data
  fetch('/api/attractions')
    // Parse the response as JSON
    .then(response => response.json()) 
    .then(data => {
      // Call the function to add markers for the attractions data
      addMarkersToMap(data); 
    })
    // Logs errors, if any
    .catch(error => console.error('Error fetching data:', error)); 
}

// Create function to add attractions markers using GeoJSON data
function addMarkersToMap(data) {
  L.geoJSON(data,  {
    onEachFeature: function (feature, layer) {
       // Extract the coordinates and call the function to add the pop-up information details
      if (feature.geometry && feature.geometry.coordinates[0]) {
        // Extract the latitude and longitude from the GeoJSON coordinates
        const [longitude, latitude] = feature.geometry.coordinates[0];
        // Bind a popup with the attraction details by calling the function
        layer.bindPopup(getPopupContent(feature.properties));
      }
    }
  // Add the markers to the Attractions layer
  }).addTo(layers.Attractions);
}

// Create a helper function to format the popup content
function getPopupContent(properties) {
  // Define the layout and information to return
  return `<b>${properties.NAME}</b><br>
          Address: ${properties.Address}<br>
          Category: ${properties.CATEGORY}<br>
          Phone: ${properties.PHONE}<br>
          <a href="${properties.WEBSITE}" target="_blank">Website</a>`;
}

// Create a function to add the 3 layers (Schools, Stations, and Attractions) 
// by calling their respective functions
map.on('overlayadd', function (eventLayer) {
  if (eventLayer.name === 'Schools') {
    fetchSchools();
  }
  if (eventLayer.name === 'Stations') {
    fetchStations();
  }
  if (eventLayer.name === 'Attractions') {
    fetchAttractions();
  }
});

// Call the properties function to load the properties upon initial load
document.addEventListener('DOMContentLoaded', fetchProperties);

// Create a function to remove the overlays so only the properties are shown upon initial load
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

function getData(form) {
  var formData = new FormData(form);

  fetchProperties(Object.fromEntries(formData));

  // console.log(Object.fromEntries(formData));
}

document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault();
  getData(e.target);
});