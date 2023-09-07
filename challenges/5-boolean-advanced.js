const isAccountLocked = false
const userRole = 'admin'

if (isAccountLocked) {
  console.log('Account is locked!')
} else if (userRole === 'admin') {
  console.log('Welcome admin!')
} else {
  console.log('Welcome!')
}
