// variables declaration 

var from = document.getElementById('from')
var to = document.getElementById('to')
var readyBtn = document.getElementById('mode1')


var output = document.getElementById('output')
var tryNum = document.getElementById('tryNum')
var checkBtn = document.getElementById('checkBtn')
var x = 0 // for checking purpose 
var outputOftry = document.getElementById('outputOftry')

var numOftry = 0;

// functions 

function getRandom(from, to) {
  return Math.floor(from + Math.random() * (to + 1 - from))
}



function RandomNumber() {
  if (+from.value !== "" && +to.value !== "" && from.value >= 0 && +to.value > 0 && from.value < to.value) {
    x = getRandom(+from.value, +to.value)
    output.innerHTML = "Now try to guess which number it is"
    console.log(x) // for checking purpose  
    document.getElementById("hidden").style.display = "block";
    readyBtn.disabled = true;
    readyBtn2.disabled = true;
    return x
  }
}


function checkNumber() {

  let maxTrials = Math.ceil(Math.log2(+to.value - +from.value + 1))
  let reminderAttempts = maxTrials - (numOftry + 1)


  if (+tryNum.value !== 0) {
    if (+tryNum.value == x) {
      output.innerHTML = "You won, the number is " + x
      outputOftry.innerText = ""
    } else if (numOftry >= maxTrials) {

      output.innerText = "You extended maximum amout of attempts and you loose"
      hidden.style.display = none;

    } else if (+tryNum.value > x) {
      numOftry++
      outputOftry.innerText = "It's your " + numOftry + " attempt. In whole you have " + maxTrials + " attempts. " + reminderAttempts + " attempts left"
      output.innerHTML = +tryNum.value + " is bigger than number"
    } else if (+tryNum.value < x) {
      numOftry++
      outputOftry.innerText = "It's your " + numOftry + " attempt. In whole you have " + maxTrials + " attempts. " + reminderAttempts + " attempts left"
      output.innerHTML = +tryNum.value + " is less than number"
    }

  }
}


// EventListeners 
readyBtn.addEventListener('click', RandomNumber)
checkBtn.addEventListener('click', checkNumber)


/// GAME SECOND MODE


// variables declarations 
var readyBtn2 = document.getElementById('mode2')

var output2 = document.getElementById('output2')
var yesBtn = document.getElementById('yesBtn')

var lowerBtn = document.getElementById('lowerBtn')
var higherBtn = document.getElementById('higherBtn')

let nGuesses = 0;
let currGuess = 0;


var middle = 0;
var interval = 0;
var lowerLimit = 0;
var upperLimit = 0;
var numToAsk = 0;

// functions 

function startGame() {
  if (from.value != "" && to.value != "" && from.value >= 0 && to.value > 0 && from.value < to.value) {
    document.getElementById("hidden2").style.display = "block";
    readyBtn2.disabled = true;
    readyBtn.disabled = true;
    lowerLimit = +from.value
    upperLimit = +to.value
    output2.innerText = "Now think of a number"
    document.getElementById('hidden3').style.display = "none"
    setTimeout(startGame2, 1000);
    return lowerLimit, upperLimit
  }
}

function startGame2() {
  document.getElementById('hidden3').style.display = "block"
  interval = ((+to.value) - (+from.value)) + 1 // интервал  
  middle = Math.floor(interval / 2) + +from.value // середина интервала 
  output2.innerText = "Is your guessed number is " + middle
  return middle, interval;
}

function higher() {

  if (middle < +to.value) {

    interval = Math.floor(upperLimit - middle) // верхний интервал
    lowerLimit = middle + 1
    middle = Math.floor(lowerLimit + (upperLimit - lowerLimit) / 2);

    output2.innerText = "Is your guessed number is " + middle
    return numToAsk, lowerLimit
  } else return output.innerText = "ERROR"
}

function lower() {

  if (middle > +from.value) {

    interval = Math.floor(middle - lowerLimit) // нижний интервал 
    upperLimit = middle - 1;
    middle = Math.floor(lowerLimit + (upperLimit - lowerLimit) / 2);

    output2.innerText = "Is your guessed number is " + middle
    return numToAsk, upperLimit
  } else return output.innerText = "ERROR"
}

function weWon() {
  output2.innerText = "I won"

  lowerBtn.disabled = true;
  higherBtn.disabled = true;
}


// EventListeners 
readyBtn2.addEventListener('click', startGame)
yesBtn.addEventListener('click', weWon)
lowerBtn.addEventListener('click', lower)
higherBtn.addEventListener('click', higher)


// CSS 
var textWrapper = document.querySelector('.ml9 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({
    loop: true
  })
  .add({
    targets: '.ml9 .letter',
    scale: [0, 1],
    duration: 1500,
    elasticity: 600,
    delay: (el, i) => 45 * (i + 1)
  }).add({
    targets: '.ml9',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });