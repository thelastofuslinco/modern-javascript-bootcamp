import { removeTodo, saveTodos, sortTodos, getTime } from './functions'

const renderHeader = (todos) => {
  const length = todos.reduce(
    (counter, todo) => (!todo.completed ? counter + 1 : counter),
    0
  )
  document.querySelector('#todo_header').textContent = `You have ${length} ${
    length > 1 ? 'todos' : 'todo'
  } left`
}

const renderTodo = (todo, todos, filter) => {
  const url = new URL('/edit.html', document.location)
  url.searchParams.set('id', todo.id)

  const updated_time = getTime(todo.updated_at)

  const textElement = document.createElement('a')
  const timeElement = document.createElement('span')
  const button = document.createElement('button')
  const input = document.createElement('input')
  const div = document.createElement('div')

  textElement.textContent = `${todo.title} - ${
    todo.completed ? 'completed' : 'uncompleted'
  }`
  textElement.style.color = todo.completed ? 'blue' : 'red'
  textElement.style.cursor = 'pointer'

  textElement.setAttribute('href', url)

  button.textContent = 'X'
  button.addEventListener('click', () => {
    removeTodo(todo.id, todos)
    saveTodos(todos)
    renderTodos(todos, filter)
  })

  input.setAttribute('type', 'checkbox')
  input.checked = todo.completed
  input.addEventListener('click', () => {
    todo.completed = !todo.completed
    saveTodos(todos)
    renderTodos(todos, filter)
  })

  timeElement.textContent = updated_time

  div.appendChild(input)
  div.appendChild(textElement)
  div.appendChild(timeElement)
  div.appendChild(button)
  document.querySelector('.todo_list').appendChild(div)
}

const renderTodos = (todos, filter) => {
  document.querySelector('.todo_list').innerHTML = ''

  const filteredTodos = todos
    .filter((todo) => {
      const searchMatch = todo.title
        .toLowerCase()
        .includes(filter.search.toLowerCase())
      const completedMatch = !filter?.completed || !todo.completed
      return searchMatch && completedMatch
    })
    .sort((a, b) => sortTodos(a, b, filter.sortBy))

  filteredTodos.forEach((todo) => renderTodo(todo, todos, filter))
  renderHeader(todos)
}

export { renderHeader, renderTodos, renderTodo }
