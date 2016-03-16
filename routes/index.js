var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

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
