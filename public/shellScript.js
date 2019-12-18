//Hvor vi definerer socket for client sider.
let socket = io.connect("http://localhost:80");

// Check efter WIFI connection change og reload siden.
var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
var type = connection.effectiveType;

function updateConnectionStatus() {
  console.log("Connection type changed from " + type + " to " + connection.effectiveType);
  type = connection.effectiveType;
  location.reload();
}
connection.addEventListener('change', updateConnectionStatus);

//Når siden som scriptet er indsat på loades så skal der tjekkes efter token (obj) --> hvis der ikke er noget så skal det redirect til shellScript.html
window.onload = function () {
        getRoomID(function(obj){
            if(!obj){
              window.location = "shellScript.html";
                return
            }
          })
        };

    // Bruger Callback til at returerne et rum id token hvis der er et
    //Det her er AJAX --> XMLHttpRequest - fordi access point ikke kan køre WebSockets
    function getRoomID(callback) {
        var xhr = new XMLHttpRequest();
        // xhr.open kalder på php serveren på routeren. defineres med get request, IP og en boolean der  er true.
        xhr.open('GET', 'http://192.168.1.1', true);
        //Vi sætter en timeout hvis serveren ikke svarer --> denne definerer hvor lang tid der går før der redirectes!
        xhr.timeout = 1000
        xhr.onload = function () {
            //Her sender vi et JSON obj til callback functionen.
            callback(JSON.parse(xhr.responseText))
        };

        xhr.ontimeout = function (e) {
            //En tom callback function hvis den ikke kan finde token
            callback()
        };

        xhr.onerror = function (e) {
            //Tom callback function der viser at den ikke kan finde et token
            callback()
        };
        xhr.send(null);
    }
