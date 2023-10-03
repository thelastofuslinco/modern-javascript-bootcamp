import { v4 } from 'uuid'
import { renderTodo, renderHeader } from './views'

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

const addNewTodo = (title, todos, filter) => {
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

export { removeTodo, saveTodos, getSavedTodos, sortTodos, getTime, addNewTodo }
