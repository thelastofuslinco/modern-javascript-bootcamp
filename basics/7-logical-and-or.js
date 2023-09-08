const temp = 55

// Logical and(&&) operator - true if both sides are true
// Logical or(||) operator - true if one side are true

if (temp >= 60 && temp <= 90) {
  console.log('It is pretty nice out!')
} else if (temp <= 0 || temp >= 120) {
  console.log('Do not go outside!')
} else {
  console.log('Do what you want')
}

const isGuestOneVegan = true
const isGuestTwoVegan = false

if (isGuestOneVegan && isGuestTwoVegan) {
  console.log('Only offer up vegan dishes.')
} else if (isGuestOneVegan || isGuestTwoVegan) {
  console.log('Make sure to offer up some vegan options.')
} else {
  console.log('Offer up anything on the menue.')
}
