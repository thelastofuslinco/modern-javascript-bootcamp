import scream from './scream'
import square, { add, name } from './utils'
import printMe from './print'

console.log('index.js', add(2, 2))
console.log(scream(`aiiiii ${name}`), square(3))
printMe('New me')
