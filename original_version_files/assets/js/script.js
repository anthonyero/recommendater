let map;
let service;
let infowindow;
var mapContainer = document.querySelector('.map-container');
var viewMapBtn = document.querySelector('.view-map-btn');

//Initializes the map. Const chicago stores the coordinates.
function initMap() {
  if (mapContainer.hasAttribute('style', 'display: none;')){
    mapContainer.removeAttribute('style', 'display: none;');
  }
  const chicago = new google.maps.LatLng(41.8781, -87.6298);

  //infowindow is initialized as a new instance of google.maps.InfoWindow.
  //variable map is assigned to google.maps.Maps.
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: chicago,
    zoom: 15,
  });
  
//produces results onto map of places in the map and places maker on specified location.
//Chicago. Request object is created to specify query and fields for the findPlaceFromQuery method.
const request = {
  query: document.querySelector('.restaurantName').textContent + ' Chicago, IL',
  fields: ["name", "geometry"],
};

//a service variable is assigned to google.maps.Maps. This uses Map object.
//findPlaceFromQuery method is called on the service object with the request object and a callback function.
service = new google.maps.places.PlacesService(map);
service.findPlaceFromQuery(request, (results, status) => {
  //In the callback function, if status is ok and there are results, a loop is used to iterate through the results.
  if (status === google.maps.places.PlacesServiceStatus.OK && results) {
    for (let i = 0; i < results.length; i++) {
      //the createMarker function is called for each result to create marker on map.
      createMarker(results[i]);
    }
    //the center of the map is the first result.
    map.setCenter(results[0].geometry.location);
  }
});
}

//The createMarker function is defined. It checks to see if it has geometry and location. If not, it returns.
function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  //a new marker object is created.
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });
  //event listener added to marker for the "click" event.
  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map, marker);
  });

  //creates new instance of the Geocoder class provided by the Google Maps API.
  const geocoder = new google.maps.Geocoder();
    //calls the geocode method of the geocoder object passing in the location object as a parameter.
    //if status on that request is ok, it proceeds.
    //checks for at least 1 result.
    geocoder.geocode({ 'location': place.geometry.location }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          
          // creates new instance of the class InfoWindow provide by the Google Maps API.
          // If address information is available, display it in an InfoWindow. This will automatically show on map.
          const address = results[0].formatted_address;
          const infoWindow = new google.maps.InfoWindow({
            content: address
          });
          infoWindow.open(map, marker);
        } else {
          console.log('No address found for this location');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  ;
}

viewMapBtn.addEventListener('click', initMap);


//This is for future testing and implementation of direction functionality 
//and retrieving userLocation from browser to have that capability.

//getLocation();

/* function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
      alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  userLocation = new google.maps.LatLng(latitude, longitude);
}
function showError(error) {
  switch(error.code) {
      case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.");
          break;
      case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;
      case error.TIMEOUT:
          alert("The request to get user location timed out.");
          break;
      case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.");
          break;
  }
}
*/