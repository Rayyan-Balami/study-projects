const onOffSwitch = document.querySelector("#onOffSwitch");
let min = document.querySelector("#min");
let max = document.querySelector("#max");
let guess = document.querySelector("#guess");
const submitBtn = document.querySelector("#submitBtn");
const resetBtn = document.querySelector("#resetBtn");
const output = document.querySelector("#output");
const number = document.querySelector("#number");
const history = document.querySelector("#history");
let noOfGuessSpan = document.querySelector("#noOfGuess");
let noOfGuess = 0;
let bestScoreSpan = document.querySelector("#bestScore");
let bestScore = 0;

let onFlag = false;

onOffSwitch.onclick = function () {
  // Toggle onFlag
  onFlag = !onFlag;
  if (onFlag) {
    output.innerHTML = "Game is on! <br>Make a guess!";
    onOffSwitch.textContent = "OFF";
    history.classList.remove("close");
  } else {
    output.textContent = "";
    number.textContent = "";
    onOffSwitch.textContent = "ON";
    history.style.display = "none";
  }
};

submitBtn.onclick = function () {
  if (onFlag) {
    history.style.display = "block";
    noOfGuess++;
    noOfGuessSpan.textContent = noOfGuess;
    let minNum = parseInt(min.value);
    let maxNum = parseInt(max.value);
    let guessNum = parseInt(guess.value);
    let randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    number.textContent = randomNum;
    
    if (guessNum === randomNum) {
      output.textContent = "Correct Guess!";
      bestScore++;
      bestScoreSpan.textContent = bestScore;
    } else {
      output.textContent = "Wrong Guess!";
    }
  }
};

resetBtn.onclick = function () {
  if (onFlag) {
    output.innerHTML = "Reset! <br>Make a guess!";
    number.textContent = "";
    noOfGuess = 0;
    noOfGuessSpan.textContent = noOfGuess;
    bestScore = 0;
    bestScoreSpan.textContent = bestScore;
  }
};
