const notes = ['note 1', 'note 2', 'note 3']
console.log(notes.length)
console.log(notes)

notes.sort((a, b) => b.slice(-1) - a.slice(-1))
console.log('Sort desc: ', notes)

notes.sort((a, b) => a.slice(-1) - b.slice(-1))
console.log('Sort asc: ', notes)

notes.push('New note')
console.log('Push: ', notes)

notes.pop()
console.log('Pop: ', notes)
