const generateBtn = document.querySelector("#generateBtn");
const resetBtn = document.querySelector("#resetBtn");
const display = document.querySelector(".display");

generateBtn.onclick = function () {
  const range = document.querySelector("#range").value;
  const randomNumber =  Math.floor(Math.random() * range);
  display.textContent = randomNumber;
}

resetBtn.onclick = function () {
  display.textContent = '~';
  document.querySelector("#range").value = 100;
}