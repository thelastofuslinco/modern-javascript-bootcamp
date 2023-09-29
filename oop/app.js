const wordEl = document.createElement('span')
const remainingGuessesEl = document.createElement('span')
const statusEl = document.createElement('span')
const div = document.createElement('div')

const renderGame = (game) => {
  wordEl.textContent = game.puzzle
  remainingGuessesEl.textContent = game.remainingGuesses
  statusEl.textContent = game.status_message

  div.appendChild(wordEl)
  div.appendChild(remainingGuessesEl)
  div.appendChild(statusEl)
  document.body.appendChild(div)
}

const play_game = (game, key) => {
  if (game.status === 'playing') {
    game.makeGuess(key)
    wordEl.textContent = game.puzzle
    remainingGuessesEl.textContent = game.remainingGuesses
    statusEl.textContent = game.status_message
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
