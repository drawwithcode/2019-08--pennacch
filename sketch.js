var myMap;
var canvas;
var position;
var distance = "--";
var me;
var chosenPosition = {lat : 45 , lng : 9};
var mappa = new Mappa("Leaflet");
var red




var myLat = 45.462;
var myLon = 9.037;


var options = {
  lat: myLat,
  lng: myLon,
  zoom: 9,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}


function setup() {

  canvas = createCanvas(windowWidth, windowHeight);

  navigator.geolocation.getCurrentPosition(showPosition);

  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);




}


function draw() {
  clear();
  var me = myMap.latLngToPixel(myLat, myLon);
  fill("white");
  ellipse(me.x, me.y, 10);

  fill("red");
  red = myMap.latLngToPixel(chosenPosition.lat, chosenPosition.lng);
  ellipse(red.x, red.y,15);

  rectMode(CENTER);
  var s = 'Click on the map              The point is ' + distance + "km away from you";
  textSize(50);
  fill(50);
  text(s, width/2, height/10*9, 600, 400);





  if (mouseIsPressed) {
    // Store the current latitude and longitude of the mouse position
    chosenPosition = myMap.pixelToLatLng(mouseX, mouseY);
    distance = calcGeoDistance(myLat, myLon, chosenPosition.lat, chosenPosition.lng, "km");


    distance = roundTo3(distance);
  }

  function roundTo3(x) {
    return Number.parseFloat(x).toFixed(3);
  }

}

function showPosition(position) {
  myLat = position.coords.latitude;
  myLon = position.coords.longitude;
  console.log(myLat, myLon);
}
