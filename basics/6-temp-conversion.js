// ((°F - 32) x 5) / 9 =°C
// ((°C x 9) / 5) + 32 =°F
// ((°F + 459.67) x 5) / 9 =°K

const celsius = ((32 - 32) * 5) / 9
const kelvin = ((32 + 459.67) * 5) / 9
const fahrenheit = (0 * 9) / 5 + 32

console.log('Celsius', celsius)
console.log('fahrenheit', fahrenheit)
console.log('Kelvin', kelvin)
