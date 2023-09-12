let todos = [
  { title: 'todo #1', completed: true },
  { title: 'todo #2', completed: true },
  { title: 'todo #3', completed: false },
  { title: 'todo #4', completed: false },
  { title: 'todo #5', completed: false },
  { title: 'todo #6', completed: true },
  { title: 'todo #7', completed: true }
]

const body = document.querySelector('body')
const todo_form = document.querySelector('.todo_form')
const todoListContainer = document.querySelector('.todo_list')
const header = document.querySelector('#todo_header')

const renderHeader = (length) => {
  header.textContent = `You have ${length} ${
    length > 1 ? 'todos' : 'todo'
  } left`
}

const renderTodo = (todo, length) => {
  const paragraph = document.createElement('p')

  paragraph.textContent = `${todo.title} - ${
    todo.completed ? 'completed' : 'uncompleted'
  }`
  paragraph.style.color = todo.completed ? 'blue' : 'red'
  paragraph.classList.add('todo')

  todoListContainer.appendChild(paragraph)
  renderHeader(length)
}

const addNewTodo = (title) => {
  const todo = { title, completed: false }
  todos.push(todo)
  renderTodo(todo, todos.length)
  todo_input.value = ''
}

const removeAllTodos = () => {
  const paragraphs = document.querySelectorAll('.todo')
  todos = []
  paragraphs.forEach((paragraph) => paragraph.remove())
  renderHeader(0)
}

todos.forEach((todo, index) => renderTodo(todo, index + 1))

todo_form.addEventListener('submit', (event) => {
  event.preventDefault()
  const { todo } = event.target

  if (event.submitter.id !== 'remove_all_todos') {
    addNewTodo(todo.value)
    return
  }

  removeAllTodos()
})
