import { v4 } from 'uuid'
import './styles.css'
import { getSavedTodos, saveTodos } from './functions'
import { renderTodo, renderTodos, renderHeader } from './views'

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

const addNewTodo = (title) => {
  const todo = {
    id: v4(),
    title,
    completed: false,
    created_at: new Date(),
    updated_at: new Date()
  }
  todos.push(todo)
  saveTodos(todos)
  renderTodo(todo, todos, filter)
  renderHeader(todos)
}

deleteAllButton.addEventListener('click', () => {
  todos = []
  saveTodos(todos)
  renderTodos(todos, filter)
})

todo_form.addEventListener('submit', (event) => {
  event.preventDefault()
  const { todo } = event.target

  addNewTodo(todo.value)
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
