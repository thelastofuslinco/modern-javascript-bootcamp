const notes = ['note 1', 'note 2', 'note 3']

console.log(notes.forEach((note) => note + 1))
console.log(notes.map((note) => note + 1))

for (let i = 0; i < notes.length; i++) {
  console.log('For: ', notes[i])
}

for (let i = notes.length - 1; i >= 0; i--) {
  console.log('For reverse: ', notes[i])
}

for (const element of notes) {
  console.log('For of: ', element)
}
