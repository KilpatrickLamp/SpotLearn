//Denne fil indeholder slideshow set src og sender gennem websocket til elev siden.

//DOM Query
var opretSlide = document.getElementById('slideOn');
var slide1 = document.getElementById('slideshowID');
var dagensslide = document.getElementById("slidelink");

//EVENTS
opretSlide.addEventListener('click', function(){
  slide1.src = dagensslide.value;
console.log(slide1.src)
  socket.emit('slideshow', {
  slide1: dagensslide.value
  })
  console.log(slide1.src)

  socket.on('slideshow', function(data){
    slideshowID = data.slide1,
    slide1 = data.slide1;
  console.log(data);
  })
});

var ouput = document.getElementById('anonymeSpørgsmål');

//Lyt om der kommer anonyme spørgsmål
socket.on('anonymtQuestion', function(data){
  anonymeSpørgsmål.innerHTML += '<p><strong>' + data.anonymtInput + '</strong> </p>';
  console.log(data.anonymtInput);

});
