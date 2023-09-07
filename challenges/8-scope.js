// Global scope one
//  Local scope two
//      Local scope three
//      Local scope two
//  Local scope one

const one = 'one'
console.log(one)

if (true) {
  const one = 'two'
  console.log(one)

  if (true) {
    const one = 'three'
    console.log(one)
  }

  if (true) {
    console.log(one)
  }
}

if (true) {
  console.log(one)
}
