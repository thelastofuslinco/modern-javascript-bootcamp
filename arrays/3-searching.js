const notes = ['note 1', 'note 2', 'note 3']

const index = notes.findIndex((note) => note === 'note 3')
const note = notes.find((note) => note === 'note 3')

console.log(notes[index])
console.log(note)
notes.splice(index, 1)
console.log(notes)
