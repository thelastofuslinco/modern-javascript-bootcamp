const add = (a, b, c) => a + b + c

const scoreText = (name = 'Anonymous', score = 0) => {
  return `Name: ${name} - ${score}`
}

const tipercent = (total, tip = 1.2) => total * tip

console.log(add(10, 5, 3))
console.log(scoreText('Lincoln', 10), scoreText())
console.log(tipercent(100))
