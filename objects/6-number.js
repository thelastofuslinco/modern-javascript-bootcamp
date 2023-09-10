const number = 102.9325

console.log(number.toFixed(2))
console.log(Math.round(number))
console.log(Math.floor(number))
console.log(Math.ceil(number))

const makeAGuess = (guess) => {
  const max = 5
  const min = 1
  const random = Math.floor(Math.random() * (max - min + 1)) + min
  console.log(random === guess, random)
}

makeAGuess(5)
