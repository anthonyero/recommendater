let map;
let service;
let infowindow;

//Initializes the map.
function initMap() {
  const chicago = new google.maps.LatLng(41.8781, -87.6298);

  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: chicago,
    zoom: 14.5,
  });
  
//produces results onto map of places in the map and places maker on specified location.
const request = {
  query: "Willis Tower",
  fields: ["name", "geometry"],
};

service = new google.maps.places.PlacesService(map);
service.findPlaceFromQuery(request, (results, status) => {
  if (status === google.maps.places.PlacesServiceStatus.OK && results) {
    for (let i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }

    map.setCenter(results[0].geometry.location);
  }
});
}

  fetch("https://google-maps-geocoding.p.rapidapi.com/geocode/json?language=en&latlng=" + latitude + "," + longitude, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "google-maps-geocoding.p.rapidapi.com",
      "x-rapidapi-key": "AIzaSyArySEMBpe3vPEMZcUfmiH7NMT_B9eaBao"
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.results.length > 0) {
      infoWindow.setContent(data.results[0].formatted_address);
    } else {
      infoWindow.setContent("Address Not Found");
    }
    infoWindow.setPosition(pos);
    infoWindow.open(map);
  })
  .catch(error => {
    console.error(error);
    infoWindow.setContent("Error: Failed to fetch address");
    infoWindow.setPosition(pos);
    infoWindow.open(map);
  });
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    let pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    infoWindow.open(map);
    map.setCenter(pos);
  }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
  });
} else {
  handleLocationError(false, infoWindow, map.getCenter());
}
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(browserHasGeolocation ?
  'Error: The Geolocation service failed.' :
  'Error: Your browser does not support geolocation.');
infoWindow.open(map);
}
