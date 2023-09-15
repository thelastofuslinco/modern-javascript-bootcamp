const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id')
let todos = getSavedTodos()
let todo = todos.find((todo) => todo.id === id)

if (!todo) {
  location.assign('/')
}

const todo_title = document.querySelector('#title')
const todo_completed = document.querySelector('#completed')
const delete_todo = document.querySelector('#delete_todo')
todo_title.value = todo.title

todo_title.addEventListener('input', (event) => {
  todo.title = event.target.value
  saveTodos(todos)
})

todo_completed.addEventListener('input', (event) => {
  todo.completed = event.target.checked
  console.log(todo.completed)
  saveTodos(todos)
})

delete_todo.addEventListener('click', () => {
  removeTodo(id, todos)
  saveTodos(todos)
  location.assign('')
})

window.addEventListener('storage', (event) => {
  console.log(JSON.parse(event.newValue))
  if (event.key === 'todos') {
    todos = JSON.parse(event.newValue)
    todo = todos.find((todo) => todo.id === id)

    if (!todo) {
      location.assign('/')
    }

    todo_title.value = todo.title
    todo_completed.checked = todo.completed
  }
})
