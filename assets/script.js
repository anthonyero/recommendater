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

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

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
