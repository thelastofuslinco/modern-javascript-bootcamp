const add = (a, b) => a + b
console.log(add(2, 2))

class User {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  get profile() {
    return this.name
  }
}

console.log(new User('Lincoln', 24).profile)
