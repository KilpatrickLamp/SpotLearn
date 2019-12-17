//DOM query
var dato = document.getElementById("dato")

// DATO - lav ny dato og brug innerHTML til at sætte den på dato.
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;
document.getElementById("dato").innerHTML = today;
