var $ = require('jquery')
var request = require('superagent')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index');
// });


$.get({url:'http://api.open-notify.org/astros.json', dataType:'jsonp'})
.done(function(data){
  for (var i = 0; i < data.people.length; i++){
    $('.astronauts ol').append('<li>' + data.people[i].name + '</li>')
  }
})

$.get({url:'http://api.open-notify.org/iss-now.json', dataType:'jsonp'})
  // var refresh = setInterval('showData()', 2000)
  .done(function showData(data){
    var issLat = (data.iss_position.latitude).toFixed(3)
    var issLong = (data.iss_position.longitude).toFixed(3)
    $('.issCoords .lat').text(issLat)
    $('.issCoords .long').text(issLong)
  // $('.issCoords .lat').load('showData()', 3000)
    var autoRefresh = setInterval(function(){
      $('.issCoords .lat').html(issLat);
      $('.issCoords .long').html(issLong);
    }, 5000);


getEarth = function (){
  var eaLat = $('#earthlat').html()
  var eaLong = $('#earthlong').html()
  if(eaLat.length > 0 && eaLong.length > 0){
    request
      .get('https://010pixel-distance-v1.p.mashape.com/?lat1='+eaLat+'&lat2='+issLat+'&long1='+eaLong+'&long2='+issLong+'&unit=K')
      .set('X-Mashape-Key', 'BBFxTmawcymshKCAoBfTWKv7eUDgp1IUCn6jsnEqGtzmRo884f')
      .set('Accept', 'application/json')
      .end(function (err, result) {
        var calckm = (result.body.value)
        $('.km').text((calckm).toFixed(2))
        $('.miles').text((calckm * 0.62137).toFixed(2))
      })
    } else {
        $('.km').text(" ")
        $('.miles').text(" ")
    }
  }
})


// $.ajax({
//   url: 'https://SOMEAPI.p.mashape.com/', // The URL to the API. You can get this in the API page of the API you intend to consume
//   type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
//   data: {}, // Additional parameters here
//   dataType: 'json',
//   success: function(data) { console.dir((data.source)); },
//   error: function(err) { alert(err); },
//   beforeSend: function(xhr) {
//   xhr.setRequestHeader("X-Mashape-Authorization", "YOUR-MASHAPE-KEY"); // Enter here your Mashape key
//   }
// });  

// Mashape API distance calculator:
//.get("https://010pixel-distance-v1.p.mashape.com/?lat1=10&lat2=34.5&long1=-25.3&long2=-403.4&unit=K")
// https://010pixel-distance-v1.p.mashape.com/
//   .get.lat1
//   .get.long1
//   .get.lat2
//   .get.long2
//   .value
//   .unit //K and M
//     {
//       "get": {
//         "long2": "-32.3",
//         "unit": "K",
//         "lat1": "10",
//         "lat2": "-25.3",
//         "long1": "34.3"
//       },
//       "error": false,
//       "value": 2794.30434845,
//       "unit": "Kilometers"
//     }


// $.get({url:'https://maps.googleapis.com/maps/api/geocode/json?'})
//   .done(function showResults(results){
//     $('.earthCoords .lat').append((results[0].geometry.location.lat()).toFixed(3))
//     $('.earthCoords .long').append((results[0].geometry.location.lng()).toFixed(3))
// })

// var mapOptions = {
//     center: new google.maps.LatLng(37.7831,-122.4039),
//     zoom: 12,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
// }

// new google.maps.Map(document.getElementById('map'), mapOptions)

// function initMap() {
//   });
  // center: new google.maps.LatLng(-41.287, 174.776),
//   var geocoder = new google.maps.Geocoder();

//   $('#submit').click(function() {
//     geocodeAddress(geocoder, map);
//   });
// }

// function geocodeAddress(geocoder, resultsMap) {
//   var address = $('#address').value;
//   geocoder.geocode({'address': address}, function(results, status) {
//     if (status === google.maps.GeocoderStatus.OK) {
//       resultsMap.setCenter(results[0].geometry.location);
//       var marker = new google.maps.Marker({
//         map: resultsMap,
//         position: results[0].geometry.location
//       });
//     } else {
//       alert('Sorry an error occurred: ' + status);
//     }
//   });
// }

// var mapOptions = {
//     center: new google.maps.LatLng(37.7831,-122.4039),
//     zoom: 12,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
// };

// var map = new google.maps.Map(document.getElementById('map'), mapOptions);

// var autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'),acOptions);
// autocomplete.bindTo('bounds',map);
// var infoWindow = new google.maps.InfoWindow();
// var marker = new google.maps.Marker({
//   map: map
// });

// google.maps.event.addListener(autocomplete, 'place_changed', function() {
//   infoWindow.close();
//   var place = autocomplete.getPlace();
//   if (place.geometry.viewport) {
//     map.fitBounds(place.geometry.viewport);
//   } else {
//     map.setCenter(place.geometry.location);
//     map.setZoom(17);
//   }
//   marker.setPosition(place.geometry.location);
//   infoWindow.setContent('<div><strong>' + place.name + '</strong><br>');
//   infoWindow.open(map, marker);
//   google.maps.event.addListener(marker,'click',function(e){

//     infoWindow.open(map, marker);

//   });
// });

//GEOCODE RESULTS:

// results[]: {
//  types[]: string,
//  formatted_address: string,
//  address_components[]: {
//    short_name: string,
//    long_name: string,
//    postcode_localities[]: string,
//    types[]: string
//  },
//  partial_match: boolean,
//  place_id: string,
//  postcode_localities[]: string,
//  geometry: {
//    location: LatLng,
//    location_type: GeocoderLocationType
//    viewport: LatLngBounds,
//    bounds: LatLngBounds
//  }
// }

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
    */
