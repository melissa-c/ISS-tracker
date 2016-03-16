# ISS-tracker
##My learning objectives:
- Using APIs and routing
- Better understanding of server-side and client-side
- TDD

##What it does:
Calculates the distance between the International Space Station and an address on Earth.

##How it works:
The distance will be calculated based on the extracted ISS position coordinates using an ISS API and the position coordinates of the address input from the browser using the Google Maps API.

###MVP:
Server-side:
- Use an API to extract the ISS coordinates, astronauts, etc.
- Use an API to extract coordinates of an address.
- Use js functions to calculate the distance.

Client-side:
- Display the extracted ISS static coordinates and info.
- Text input field for address on Earth.
- Display the distance between the ISS and the address in km and mi.

###Wireframe:
![wireframe](img/iss_wireframe.png "wireframe of website design")

###Stretch:
- Update ISS coordinates as it moves (every 2 seconds) and update the displayed distance accordingly.
- Map with clickable marker for address location.
- World map showing marker of address and ISS location.
- Calculate the distance using an API.
