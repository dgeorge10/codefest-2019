function initMap() {
  var myLatLng = {lat: 39.96, lng: -75.16};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: myLatLng
  });

  $.ajax({
    url: "/api/food/",
    success: (data) => {
      markers = []
      for(entry of data){
        if(entry.lat == null || entry.lon == null) {
          continue
        }
        var marker = new google.maps.Marker({
          position: {lat: entry.lat, lng: entry.lon},
          map: map,
          title: entry.name
        })
        markers.push(marker)
      }
      var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    }
  })

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}
