const add = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw Error('Please provide a number')
  }

  return a + b
}

try {
  console.log(add(2, 5), add(2, '5'))
} catch (error) {
  console.log(error.message)
}
