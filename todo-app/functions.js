const getSavedTodos = () => {
  const jsonTodos = JSON.parse(localStorage.getItem('todos'))

  try {
    return jsonTodos !== null ? jsonTodos : []
  } catch (error) {
    return []
  }
}

const sortTodos = (a, b, sortBy) => {
  if (sortBy === 'completed') {
    return b.completed - a.completed
  } else if (sortBy === 'uncompleted') {
    return a.completed - b.completed
  } else if (sortBy === 'title') {
    if (a.title < b.title) return -1
    else if (a.title > b.title) return 1
    else return 0
  } else if (sortBy === 'created_at') {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  } else if (sortBy === 'updated_at') {
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  } else {
    return 0
  }
}

const getTime = (time) => {
  const date1 = new Date(time)
  const date2 = new Date()
  const diff = Math.abs(date2 - date1)
  const diffTime = {
    s: Math.floor(diff / 1000),
    m: Math.floor(diff / (1000 * 60)),
    h: Math.floor(diff / (1000 * 60 * 60))
  }

  if (diffTime.h > 1) {
    return `${diffTime.h} hour ago`
  } else if (diffTime.m > 1) {
    return `${diffTime.m} minutes ago`
  } else {
    return `${diffTime.s} seconds ago`
  }
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
