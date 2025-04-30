const subscribeLabel = document.querySelector('label[for="subscribe"]');
const subscribeCheckbox = document.querySelector('#subscribe');
const visaLabel = document.querySelector('label[for="visa"]');
const visaRadio = document.querySelector('#visa');
const mastercardLabel = document.querySelector('label[for="mastercard"]');
const mastercardRadio = document.querySelector('#mastercard');
const paypalLabel = document.querySelector('label[for="paypal"]');
const paypalRadio = document.querySelector('#paypal');
const bitcoinLabel = document.querySelector('label[for="bitcoin"]');
const bitcoinRadio = document.querySelector('#bitcoin');

const result = document.querySelector('#result');
const retryBtn = document.querySelector('#retryBtn');

subscribeLabel.onclick = function() {
  if (!subscribeCheckbox.checked) {
    
    result.textContent = 'Subscribed!\n Choose payment method:';
  }
  else {
    result.textContent = 'Not subscribed!';
  }
  document.querySelector('#screen1').classList.toggle('close');
  document.querySelector('#screen2').classList.toggle('close');
}

visaLabel.onclick = function() {
  if (!visaRadio.checked) {
    result.textContent = 'Visa! Thank You!';
  }
}

mastercardLabel.onclick = function() {
  if (!mastercardRadio.checked) {
    result.textContent = 'Mastercard! Thank You!';
  }
}

paypalLabel.onclick = function() {
  if (!paypalRadio.checked) {
    result.textContent = 'Paypal! Thank You!';
  }
}

bitcoinLabel.onclick = function() {
  if (!bitcoinRadio.checked) {
    result.textContent = 'Bitcoin! Thank You!';
  }
}

retryBtn.onclick = function() {
  document.querySelector('#screen1').classList.toggle('close');
  document.querySelector('#screen2').classList.toggle('close');
  result.textContent = 'Sasat ATM : Retry';
  subscribeCheckbox.checked = false;
  visaRadio.checked = false;
  mastercardRadio.checked = false;
  paypalRadio.checked = false;
  bitcoinRadio.checked = false;
}

