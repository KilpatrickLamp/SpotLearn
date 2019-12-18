const express = require('express');
var socket = require('socket.io');
var http = require("http");

var rooms = {
}

function reply(request, response) {
        //We are only interested in data posts
        let data = ''
        request.on('data', function (d) {
            data += d
        })

        request.on('end', function () {
            var obj = JSON.parse(data)
            //we need to set headers to fix CORS error and ensure that client knows
            //it is getting json
            response.setHeader("Access-Control-Allow-Origin", "*")
            response.setHeader('Content-Type', 'application/json');
            response.writeHead(200)
            //we send placeholder room.
            response.end(JSON.stringify({room: "lolrum", content: "Hello people"}))
        })
}

let app = express();

//SERVERENS PORT
const port = process.env.PORT || 80
const server = app.listen(port, function() {
  console.log("Server is up and running on port 80");
});

/*let server = app.listen(80, function() {
  console.log("Server running on port 80");
});*/

//Static files to use in the public folder
app.use(express.static('public'));

//Socket Setup
var io = socket(server);

//Modtag data og send det ud til alle sockets (alle der er forbundet).
io.on('connection', function(socket){
  console.log("Socket Connection Done - ID: ", socket.id);

  //Chat socket
  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  })

//Når nogen taster i chatten
  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data)
  });

//Slideshow socket
  socket.on('slideshow', function(data){
    io.sockets.emit('slideshow', data.slide1)
  });

//Spørgsmål til underviser socket
  socket.on('anonymtQuestion', function(data){
    io.sockets.emit('anonymtQuestion', data)
  })
})
