const notes = [
  { title: 'note 1', completed: true },
  { title: 'note 2', completed: true },
  { title: 'note 3', completed: false },
  { title: 'note 4', completed: false },
  { title: 'note 5', completed: false },
  { title: 'note 6', completed: true },
  { title: 'note 7', completed: true }
]

const getThingsToDo = () => {
  return notes.filter((note) => !note.completed)
}

const getCompletedToDo = () => {
  return notes.filter((note) => note.completed)
}

console.log(getThingsToDo())
console.log(getCompletedToDo())
