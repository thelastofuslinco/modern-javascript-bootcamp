const book = {
  name: 'The war of art'
}

console.log(book.hasOwnProperty('name'), book.hasOwnProperty('hasOwnProperty'))

Object.prototype.hasOwnProperty = () => 'New function'

console.log(book.hasOwnProperty('name'), book.hasOwnProperty('hasOwnProperty'))
