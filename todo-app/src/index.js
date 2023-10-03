import './styles.css'
import { getSavedTodos, saveTodos, addNewTodo } from './functions'
import { renderTodos } from './views'

let todos = getSavedTodos()

const filter = {
  search: '',
  completed: false,
  sortBy: ''
}

const todo_form = document.querySelector('#todo_form')
const filter_form = document.querySelector('#filter_form')
const deleteAllButton = document.querySelector('#remove_all_todos')

renderTodos(todos, filter)

deleteAllButton.addEventListener('click', () => {
  todos = []
  saveTodos(todos)
  renderTodos(todos, filter)
})

todo_form.addEventListener('submit', (event) => {
  event.preventDefault()
  const { todo } = event.target

  addNewTodo(todo.value, todos, filter)
  todo.value = ''
})

filter_form.addEventListener('submit', (event) => {
  event.preventDefault()
  const { search, check, select } = event.target
  filter.search = search.value
  filter.completed = check.checked
  filter.sortBy = select.value

  renderTodos(todos, filter)
})

window.addEventListener('storage', (event) => {
  if (event.key === 'todos') {
    todos = JSON.parse(event.newValue)
    renderTodos(todos, filter)
  }
})
