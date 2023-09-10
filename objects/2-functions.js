const fahrenheitConvert = (fahrenheit) => {
  return {
    fahrenheit,
    celsius: ((fahrenheit - 32) * 5) / 9,
    kelvin: ((fahrenheit + 459.67) * 5) / 9
  }
}

console.log(fahrenheitConvert(32))
