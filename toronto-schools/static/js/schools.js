function createMap(schools) {
    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });


    // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
    "Street Map": streetmap
    };

    // Create an overlayMaps object to hold the SCHOOLS layer.
    let overlayMaps = {
    "Educational Institues": schools
    };

    // Create the map object with options.
    let map = L.map("map", {
    center: [43.65,-79.3832],
    zoom: 12,
    layers: [streetmap, schools]
    });

    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
    }).addTo(map);
}
function fetchAttractions() {
  fetch('/api/toronto_schools') // Making a request to the server to get attractions data
    .then(response => response.json()) // Parses the response as JSON
    .then(data => {
        createMarkers(data); // Calling function to add markers based on this data
    })
    .catch(error => console.error('Error fetching data:', error)); // Logs errors, if any
}


var schoolIcon = L.icon({
    iconUrl:  ('/images/school.png'),

    iconSize:     [38, 95], // size of the icon
    
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

document.addEventListener('DOMContentLoaded', fetchAttractions);
                
function createMarkers(response) {

    let schoolMarkers = [];

    for (let index = 0; index < response.length; index++) {
        var school = response[index];
        var lat = school.LAT; // Extract latitude from the data
        var long = school.LONG;
        let schoolMarker = L.marker([lat, long]).bindPopup("<h3>" + school.NAME + "<h3><h3> " + school.ADDRESS_FULL + "</h3>");
        schoolMarkers.push(schoolMarker);
            }

                    // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
        createMap(L.layerGroup(schoolMarkers));
     }
  