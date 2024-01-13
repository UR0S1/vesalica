var rec;
var n;
function setup(){
  generateKeyboard();
  generisiCrte();
}

function generateKeyboard() {
  var keyboard = document.getElementById("keyboard");
  var keys = "љњертзуиопшасдфгхјклчћџцвбнмђж".split("");
  for (var i = 0; i < keys.length; i++) {
    var key = document.createElement("button");
    key.innerHTML = keys[i];
    key.id = `${keys[i]}`;
    key.onclick = function() {
     novGameState(this.innerHTML); 
    };
    if(i < 11)
      keyboard.querySelector('#line1').appendChild(key);
    else if(i < 22)
          keyboard.querySelector('#line2').appendChild(key);
        else
          keyboard.querySelector('#line3').appendChild(key);
  }
}

function randomNumber(n){
  return Math.floor(Math.random()*n);
}

function generisiRec(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'assets/reci.txt', false);
  xhr.send();
  var lines = xhr.responseText.split('\n');
  var word = lines[randomNumber(lines.length)];
  return word.trim();
}


function generisiCrte(){
  rec = generisiRec();
  n = rec.length;
  var box = document.getElementById('word-box');
  for(var i = 0; i < rec.length; i++){
    var letter = document.createElement('div');
    letter.id = `slovo${i}`;
    letter.innerHTML = '\u00A0';
    box.appendChild(letter);
  }

}

var pogadjano = [];
function novGameState(slovo){
  if(!pogadjano.includes(slovo)){
    pogadjano.push(slovo);

    if(!rec.includes(slovo)){
      document.getElementById(slovo).style.backgroundColor = '#f91414'
      obesi();
    }
    else {
      let i = 0;
      
      i = rec.indexOf(slovo, i);
      while(i != -1 && i < rec.length){
        --n;
        document.getElementById(`slovo${i}`).innerHTML = slovo;
        document.getElementById(slovo).style.backgroundColor = '#17c428';
        i = rec.indexOf(slovo, i + 1);
      }
      if(n == 0)
        setTimeout(win, 800);
    }

  }
}

var array = ['sama_vesalica.png','glava_vesalica.png', 'telo_vesalica.png', 'noga_vesalica.png', 'noge_vesalica.png', 'ruke_vesalica.png', 'mrtav_vesalica.png'];
function obesi(){
  var vesalica = document.getElementById('vesalica');
  var img = vesalica.src.substring(vesalica.src.indexOf('assets/'));
  img = img.substring(img.indexOf('/') + 1);
  var index = array.indexOf(img);
  vesalica.src = `assets/${array[index + 1]}`;
  if(index == array.length - 2){
    //document.getElementById('keyboard').removeEventListener();
    setTimeout(gameOver, 1200);
  }
}
var iframe = document.createElement('iframe')
iframe.src = 'gameOver.html';
iframe.style.display = 'none';

function gameOver(){
  document.body.innerHTML = '';
  var GameOver = document.createElement('h1');
  GameOver.innerHTML = 'ОБЕШЕН САМ :(';

  var resenje = document.createElement('h2');
  resenje.innerHTML = `Решење је било "${rec}"`;

  var box = document.createElement('div');
  box.id = 'restartDiv';

  var dugme = document.createElement('button');
  dugme.innerHTML = "Покушај поново";
  dugme.onclick = function() {
    open('index.html', '_self'); 
   };
  
  document.body.appendChild(GameOver);
  document.body.appendChild(resenje);
  document.body.appendChild(box);
  document.getElementById('restartDiv').appendChild(dugme);
}


function restartGame(){
  open('index.html','_self');
}

function win(){
  document.body.innerHTML = '';
  var GameOver = document.createElement('h1');
  GameOver.innerHTML = 'Браво!<br>Нисте ме обесили :)';

  var box = document.createElement('div');
  box.id = 'restartDiv';

  var dugme = document.createElement('button');
  dugme.innerHTML = "Играј поново";
  dugme.onclick = function() {
    open('index.html', '_self'); 
   };
  
  document.body.appendChild(GameOver);
  document.body.appendChild(box);
  document.getElementById('restartDiv').appendChild(dugme);
}

function hint(){
  document.getElementById('hint').disabled=true;
  slovo = rec[randomNumber(rec.length)];
  let i = 0;
  
  i = rec.indexOf(slovo, i);
  while(i != -1 && i < rec.length){
    --n;
    document.getElementById(`slovo${i}`).innerHTML = slovo;
    document.getElementById(slovo).style.backgroundColor = '#17c428';
    i = rec.indexOf(slovo, i + 1);
  }
  if(n == 0)
    setTimeout(win, 800);
}

