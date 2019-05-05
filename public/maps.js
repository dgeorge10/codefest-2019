function initMap() {
  var myLatLng = {lat: 39.96, lng: -75.16};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: myLatLng
  });

  fillData(map);
}

function addEntry(map, entry, markers, color) {
  if(entry.lat == null || entry.lon == null) {
    return
  }

  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h4 id="firstHeading" class="firstHeading">' + entry.name + '</h4>'+
      '<div id="bodyContent">'+
      '<p>' + entry.address + ', Philadelphia, PA' + entry.zip + '</p>' +
      '</div>'+
      '</div>';
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var marker = new google.maps.Marker({
    position: {lat: entry.lat, lng: entry.lon},
    map: map,
    title: entry.name,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/"+color+"-dot.png"
    }
  })
  google.maps.event.addListener(marker, 'click', (function(marker, contentString, infowindow) {
    return function() {
      infowindow.setContent(contentString)
      infowindow.open(map, marker);
    }
  }) (marker, contentString, infowindow));
  markers.push(marker)
}

function fillData(map) {
  $.ajax({
    url: "/api/food",
    success: (foodData) => {
      $.ajax({
        url: "api/shelters",
        success: (shelterData) => {
          markers = [];
          for(entry of foodData) {
            addEntry(map, entry, markers, "red");
          }
          console.log(shelterData)
          for(entry of shelterData) {
            addEntry(map, entry, markers, "blue")
          }
          var markerCluster = new MarkerClusterer(map, markers,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        }
      })
    }
  })
}
