const user = '  Lincoln Duarte   '

console.log(user.toLocaleLowerCase())
console.log(user.toUpperCase())
console.log(user.trim())

const isValidPassword = (password) => {
  return password.length >= 8 && password.includes('password')
}

console.log(isValidPassword('password'))
