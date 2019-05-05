function initMap() {
  var myLatLng = {lat: 39.96, lng: -75.16};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: myLatLng
  });

  $.ajax({
    url: "/api/food/",
    success: (data) => {
      for(entry of data){
        new google.maps.Marker({
          position: {lat: entry.lat, lng: entry.lon},
          map: map,
          title: entry.name
        })
      }
    }
  })

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}
