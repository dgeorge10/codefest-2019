const csv = require('csv-parser');
const fs = require('fs');

const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyC5TCyAGCOGtx01jshP07GQ5fPYUj1b3xw'
});

fs.createReadStream('data/Food.csv')
  .pipe(csv())
  .on('data', (row) => {
    my_address = row['Address - Line 1 '] + ", " + row['City']
    googleMapsClient.geocode({
      address: my_address
    }, function(err, response) {
      if (!err) {
        var loc = response.json.results[0].geometry.location
        console.log(response.query.address + ", " + loc.lat + ", " + loc.lng);
      }
      else{
        console.log(err);
      }
    });
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
