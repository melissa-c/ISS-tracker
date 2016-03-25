var $ = require('jquery')
var request = require('superagent')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index');
// });

$.get({url:'http://api.open-notify.org/astros.json', dataType:'jsonp'})
  .done(function(data){
  for (var i = 0; i < data.people.length; i++){
    $('.astronauts ol').append('<li>' + data.people[i].name +'</li>')
  }
})

$.get({url:'http://api.open-notify.org/iss-now.json', dataType:'jsonp'})
  .done(function(data){
    $('.issCoords .lat').append((data.iss_position.latitude).toFixed(3))
    $('.issCoords .long').append((data.iss_position.longitude).toFixed(3))
})

function initMap() {
  var map = new google.maps.Map($('#map'), {
    zoom: 8,
    center: {lat: -41.287, lng: 174.776}
  });
  var geocoder = new google.maps.Geocoder();

  $('#submit').click(function() {
    geocodeAddress(geocoder, map);
  });
}

function geocodeAddress(geocoder, resultsMap) {
  var address = $('#address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Sorry an error occurred: ' + status);
    }
  });
}

//request
//   .get("https://010pixel-distance-v1.p.mashape.com/?lat1=10&lat2=34.5&long1=-25.3&long2=-403.4&unit=K")
//   .set("X-Mashape-Key", process.env.X_MASHAPE_KEY)
//   .set("Accept", "application/json")
//   .end(function (result) {
//   console.log(result.status, result.headers, result.body);
// });
/*
ISS API current location:
http://api.open-notify.org/iss-now.json
  .iss_position.latitude
  .iss_position.longitude
    {
      "message": "success",
      "timestamp": UNIX_TIME_STAMP,
      "iss_position": {
        "latitude": CURRENT_LATITUDE,
        "longitude": CURRENT_LONGITUDE
      }
    }

ISS API astronauts:
http://api.open-notify.org/astros.json
  .number
  .people[i].name
    {
      "message": "success",
      "number": NUMBER_OF_PEOPLE_IN_SPACE,
      "people": [
        {"name": NAME, "craft": SPACECRAFT_NAME},
        ...
      ]
    }

Mashape API distance calculator:
https://010pixel-distance-v1.p.mashape.com/
  .get.lat1
  .get.long1
  .get.lat2
  .get.long2
  .value
  .unit //K and M
    {
      "get": {
        "long2": "-32.3",
        "unit": "K",
        "lat1": "10",
        "lat2": "-25.3",
        "long1": "34.3"
      },
      "error": false,
      "value": 2794.30434845,
      "unit": "Kilometers"
    }
*/
