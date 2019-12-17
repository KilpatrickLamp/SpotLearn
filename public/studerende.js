//Denne fil indeholder sockets til CHAT, SLIDESHOW + ANONYME SPØRGSMÅL

//DOM Query til CHAT
var besked = document.getElementById('besked');
var navn = document.getElementById('navn');
var sendBesked = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// Chat EVENTS
sendBesked.addEventListener('click', function(){
  socket.emit('chat', {
    besked: besked.value,
    navn: navn.value
  })
})

    besked.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      socket.emit('chat', {
        besked: besked.value,
        navn: navn.value
      })
    }
});

//se navn på den der taster
besked.addEventListener('keypress', function(){
  socket.emit('typing', navn.value);
});

//Listen for Events
socket.on('chat', function(data){
  besked.value = "";
  besked.placeholder = "";
  feedback.innerHTML = "";
  output.innerHTML += '<p><strong>' + data.navn + ':  </strong>' + data.besked + '</p>';

})

socket.on('typing', function(data){
  feedback.innerHTML = '<p><em>' + data + ' skriver en besked...</em></p>';
})

//SLideshow socket skal være på
socket.on('slideshow', function(data){

  slideshowID.src = data;
  console.log(outputSlide.value)

})

//Anonymt spørgmsål til Underviser
// DOM QUERY
var anonymtInput = document.getElementById('anon');
var anonymKnap = document.getElementById('anonymKnap');
var anonno = document.getElementById('anonno');

anonymKnap.addEventListener("click", function(){
  socket.emit('anonymtQuestion', {
    anonymtInput: anonymtInput.value
})

anonno.innerHTML += '<p>' + anonymtInput.value + '</p>'
anonymtInput.value = "";

  })
