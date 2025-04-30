const submitBtn = document.querySelector('#submitBtn');
const output = document.querySelector('#output');
const data = document.querySelector('#data');
const unitSpan = document.querySelector('#unit');
const degreeSymbol = '\u00B0';

submitBtn.onclick = function () {
  const temperature = parseInt(document.querySelector('#temperature').value);
  const fromUnit = document.querySelector('#from').value.charAt(0).toUpperCase();
  const toUnit = document.querySelector('#to').value.charAt(0).toUpperCase();

  if (isNaN(temperature)) {
    data.textContent = 'Please enter a valid temperature';
  } else if (fromUnit === toUnit) {
    data.innerHTML = `Conversion: ${degreeSymbol}${fromUnit} to ${degreeSymbol}${toUnit} same units`;
    output.textContent = temperature + degreeSymbol + toUnit;
  } else {
    const convertedTemperature = convertTemperature(temperature, fromUnit, toUnit);
    if (convertedTemperature !== null) {
      data.innerHTML = `Conversion: ${degreeSymbol}${fromUnit} to ${degreeSymbol}${toUnit}`;
      output.textContent = convertedTemperature + degreeSymbol + toUnit;
    } else {
      data.textContent = 'Please enter valid units';
    }
  }
};

function convertTemperature(temperature, fromUnit, toUnit) {
  switch (fromUnit + toUnit) {
    case 'CF':
      return celsiusToFahrenheit(temperature);
    case 'CK':
      return celsiusToKelvin(temperature);
    case 'FC':
      return fahrenheitToCelsius(temperature);
    case 'FK':
      return fahrenheitToKelvin(temperature);
    case 'KC':
      return kelvinToCelsius(temperature);
    case 'KF':
      return kelvinToFahrenheit(temperature);
    default:
      return null;
  }
}

function celsiusToFahrenheit(celsius) {
  let result = (celsius * 9 / 5) + 32;
  return result.toFixed(5);
}

function celsiusToKelvin(celsius) {
  let result = celsius + 273.15;
  return result.toFixed(5);
}

function fahrenheitToCelsius(fahrenheit) {
  let result = (fahrenheit - 32) * 5 / 9;
  return result.toFixed(5);
}

function fahrenheitToKelvin(fahrenheit) {
  let result = (fahrenheit + 459.67) * 5 / 9;
  return result.toFixed(5);
}

function kelvinToCelsius(kelvin) {
  let result = kelvin - 273.15;
  return result.toFixed(5);
}

function kelvinToFahrenheit(kelvin) {
  let result = kelvin * 9 / 5 - 459.67;
  return result.toFixed(5);
}