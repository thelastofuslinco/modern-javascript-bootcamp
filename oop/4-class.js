class Person {
  constructor({ name, age, likes = [] }) {
    this.name = name
    this.age = age
    this.likes = likes
  }
  getBio() {
    let bio = `${this.name} is ${this.age}.`

    this.likes.forEach((like) => (bio += ` ${this.name} likes ${like}`))
    return bio
  }
  setName(name) {
    this.name = name
  }

  get fullName() {
    return `${this.name} passing in get function`
  }
}

class Employee extends Person {
  constructor({ position, ...params }) {
    super(params)
    this.position = position
  }
}

class Students extends Person {
  constructor({ grade, ...params }) {
    super(params)
    this.grade = grade
  }
  upgradeGrade(newGrade) {
    this.grade += newGrade
  }
  getBio() {
    const status = this.grade >= 70 ? 'passing' : 'failing'
    return `${this.name} is ${status} the class`
  }
}

const me = new Students({
  name: 'Lincoln',
  grade: 70,
  age: 24,
  likes: ['video games', 'tv', 'dogs', 'gym']
})

console.log(me.getBio())
me.upgradeGrade(-20)
console.log(me.getBio(), me.fullName)
