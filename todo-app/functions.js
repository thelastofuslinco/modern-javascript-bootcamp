const getSavedTodos = () => {
  const jsonTodos = JSON.parse(localStorage.getItem('todos'))

  if (jsonTodos !== null) {
    return jsonTodos
  }

  return []
}

const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

const removeTodo = (id, todos) => {
  const index = todos.findIndex((todo) => todo.id === id)
  if (index !== -1) {
    todos.splice(index, 1)
  }
}

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
  const textElement = document.createElement('span')
  const timeElement = document.createElement('span')
  const button = document.createElement('button')
  const input = document.createElement('input')
  const div = document.createElement('div')

  textElement.textContent = `${todo.title} - ${
    todo.completed ? 'completed' : 'uncompleted'
  }`
  textElement.style.color = todo.completed ? 'blue' : 'red'
  textElement.style.cursor = 'pointer'

  textElement.addEventListener('click', () => {
    const url = new URL('/edit.html', document.location)
    url.searchParams.set('id', todo.id)
    window.location.href = url
  })

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

  timeElement.textContent = new Date(todo.created_at).toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  })

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
    .sort((a, b) => {
      if (filter.sortBy === 'completed') {
        return b.completed - a.completed
      } else if (filter.sortBy === 'uncompleted') {
        return a.completed - b.completed
      } else if (filter.sortBy === 'title') {
        if (a.title < b.title) return -1
        else if (a.title > b.title) return 1
        else return 0
      } else if (filter.sortBy === 'time') {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
      } else {
        return 0
      }
    })

  filteredTodos.forEach((todo) => renderTodo(todo, todos, filter))
  renderHeader(todos)
}