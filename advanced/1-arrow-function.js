const square = (num) => num * num
console.log(square(5))

const people = [
  { name: 'Lincoln', age: 24 },
  {
    name: 'Jhon',
    age: 26
  },
  {
    name: 'Jess',
    age: 35
  }
]

const under30 = people.filter((person) => person.age < 30)
console.log(under30)

const person = people.find((person) => person.age === 24)
console.log(person.name)
