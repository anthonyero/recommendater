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
})