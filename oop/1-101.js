const Person = function (name, age, address, likes = []) {
  this.name = name
  this.age = age
  this.address = address
  this.likes = likes
}

Person.prototype.getBio = function () {
  let bio = `${this.name} is ${this.age}.`

  this.likes.forEach((like) => (bio += ` ${this.name} likes ${like}`))
  return bio
}

const lincoln = new Person('Lincoln', 24, 'Avenida e', [
  'video games',
  'tv',
  'dogs',
  'gym'
])
console.log(lincoln)
console.log(lincoln.getBio())
