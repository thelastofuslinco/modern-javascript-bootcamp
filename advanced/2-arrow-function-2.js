const add = function () {
  return arguments
}

console.log(add(1, 2, 3, 4))

const car = {
  color: 'Red',
  getSummary() {
    return `The car is ${this.color}`
  }
}

console.log(car.getSummary())
