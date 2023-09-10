const notes = [
  { title: 'note 1', completed: true },
  { title: 'note 2', completed: true },
  { title: 'note 3', completed: false },
  { title: 'note 4', completed: false },
  { title: 'note 5', completed: false },
  { title: 'note 6', completed: true },
  { title: 'note 7', completed: true }
]

notes.sort((a, b) => b.completed - a.completed)
console.log('Sort by completed: ', notes)

notes.sort((a, b) => a.completed - b.completed)
console.log('Sort by uncompleted: ', notes)

notes.sort((a, b) => {
  if (a.title < b.title) {
    return -1
  } else if (a.title > b.title) {
    return 1
  } else {
    return 0
  }
})
console.log('Sort by title: ', notes)
