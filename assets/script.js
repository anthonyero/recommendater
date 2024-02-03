let map;
let infoWindow;

//Initializes the map.
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow;
  
//Event handler for map click.
google.maps.event.addListener(map, 'click', function(event) {
  let latitude = event.latLng.lat();
  let longitude = event.latLng.lng();
  let pos = {
    lat: latitude,
    lng: longitude
  };
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
