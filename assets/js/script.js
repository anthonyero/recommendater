let map;
let service;
let infowindow;
var mapContainer = document.querySelector('.map-container');
var viewMapBtn = document.querySelector('.view-map-btn');

  viewMapBtn.addEventListener('click', initMap);

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
    zoom: 13,
  });
  
//produces results onto map of places in the map and places maker on specified location.
//Chicago. Request object is created to specify query and fields for the findPlaceFromQuery method.
const request = {
  query: document.querySelector('.restaurantName').textContent,
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

  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}

function displayMarker() {
  marker.setMap(map);

}

window.initMap = initMap;
