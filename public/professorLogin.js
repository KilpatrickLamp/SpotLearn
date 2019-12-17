//DOM Query
let åbenLogin = document.getElementById('åbenLogIn');
let logInOutput = document.getElementById('logInOutput');
let logInFeedback = document.getElementById('logInFeedback');
let indhold = document.getElementById("content").style;

//Åben login Modulet
åbenLogin.addEventListener('click', function(){
  logInFeedback.innerHTML +="<div id='loginInForm' method='post'> <input type='text' id='username' name='username' value='Skriv dit brugernavn her' /><br /> <input type='text' id='kodeord' name='kode' value='Indtast din kode her'/><br /> <input type='submit' id='button' name='logInSubmit' value='Log In'/></div>";
nextStep();
})

//DOM query på det der loades ind
function nextStep(){
let logInForm = document.getElementById('logInForm');
let brugernavn = document.getElementById('username');
let kodeord = document.getElementById('kodeord');
let login = document.getElementById('button');

//Events på det nye der er sat ind
brugernavn.addEventListener('click', function(){
  brugernavn.value="";
})

kodeord.addEventListener('click', function(){
  kodeord.value="";
})

//Login hvis bruger og kode er korrekt ---> sætter indhold.display til at vise.
button.addEventListener('click', function(){
  if (brugernavn.value === 'Midas' && kodeord.value === 'password') {
    indhold.display = '';
    var elem = document.getElementById("LogInModul");
    elem.parentElement.removeChild(elem);
    }
 else {
   logInOutput.innerHTML = "Forkert kode eller brugernavn"
  }
})
}
