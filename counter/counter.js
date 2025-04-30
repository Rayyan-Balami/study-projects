let count = document.getElementById('count');
let decreaseBtn = document.getElementById('decreaseBtn');
let resetBtn = document.getElementById('resetBtn');
let increaseBtn = document.getElementById('increaseBtn');

decreaseBtn.onclick = function () {
  count.textContent = parseInt(count.textContent) - 1;
}

resetBtn.onclick = function () {
  count.textContent = 0;
}

increaseBtn.onclick = function () {
  count.textContent = parseInt(count.textContent) + 1;
}