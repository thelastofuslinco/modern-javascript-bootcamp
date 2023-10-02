import Hangman from './2-hangman'
import new_request from './request'
// console.log('asdasdd')
const div = document.createElement('div')
const wordEl = document.createElement('span')
const statusEl = document.createElement('span')
const button = document.createElement('button')

const render_word = (game) => {
  wordEl.innerHTML = ''
  game.puzzle.split('').forEach((word) => {
    const span = document.createElement('span')
    span.textContent = word
    wordEl.appendChild(span)
  })
  statusEl.textContent = game.status_message
}

const renderGame = (game) => {
  render_word(game)
  button.textContent = 'reset'
  button.onclick = start_game

  wordEl.classList.add('word')
  statusEl.classList.add('status')
  div.classList.add('game_container')

  div.appendChild(wordEl)
  div.appendChild(statusEl)
  div.appendChild(button)
  document.body.appendChild(div)
}

const play_game = (game, key) => {
  if (game.status === 'playing') {
    game.makeGuess(key)
    render_word(game)
  }
}

const start_game = async () => {
  const response = await new_request.get(
    'https://puzzle.mead.io/puzzle?wordCount=3'
  )

  const puzzle = new Hangman(response.puzzle, 3)

  renderGame(puzzle)
  window.addEventListener('keypress', (event) => {
    play_game(puzzle, event.key)
  })
}

start_game()

// const get_location = async () => {
//   const location = await new_request.get(
//     'https://ipinfo.io/json?token=b9bdc67fc5f35a'
//   )
//   const position = await new_request.get('https://restcountries.com/v3.1/all')

//   const country_code = location.country
//   const country = position?.find((country) => country.cca2 === country_code)

//   return `You are currently in ${location.city} ${location.region} ${country.name.common}!`
// }

// get_location().then(console.log).catch(console.error)

const typewriter_effect = async (current_word) => {
  for (let i = 0; i < current_word.length; i++) {
    statusEl.innerHTML = current_word.substring(0, i + 1)
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
}
