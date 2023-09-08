// ((°F - 32) x 5) / 9 =°C
// ((°C x 9) / 5) + 32 =°F
// ((°F + 459.67) x 5) / 9 =°K

const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9
const fahrenheitToKelvin = (fahrenheit) => ((fahrenheit + 459.67) * 5) / 9
const celsiusTofahrenheit = (celsius) => (celsius * 9) / 5 + 32

console.log('Celsius', fahrenheitToCelsius(50))
console.log('fahrenheit', celsiusTofahrenheit(10))
console.log('Kelvin', fahrenheitToKelvin(60))

const square = (num) => num * num

const result = square(3)
console.log(result)
