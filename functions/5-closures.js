const counter_function = () => {
  let counter = 0

  return {
    increment() {
      counter++
    },
    decrement() {
      counter--
    },
    get get() {
      return counter
    }
  }
}

const counter = counter_function()
console.log(counter.get)
counter.increment()
counter.decrement()
counter.decrement()
console.log(counter.get)

const add = (a) => (b) => a + b
const add10 = add(10)

console.log(add10(1))
console.log(add10(30))

const total =
  (tip = 0.15) =>
  (amount) =>
    amount * tip
const tip15 = total()
const tip30 = total(0.3)
const tip50 = total(0.5)

console.log(tip15(100), tip30(100), tip50(100))
