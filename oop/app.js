const wordEl = document.createElement('span')
const remainingGuessesEl = document.createElement('span')
const statusEl = document.createElement('span')
const div = document.createElement('div')
const game_one = new Hangman('Cat paws', 2)

wordEl.textContent = game_one.puzzle
remainingGuessesEl.textContent = game_one.remainingGuesses
statusEl.textContent = game_one.status_message

div.appendChild(wordEl)
div.appendChild(remainingGuessesEl)
div.appendChild(statusEl)
document.body.appendChild(div)

window.addEventListener('keypress', (event) => {
  if (game_one.status === 'playing') {
    game_one.makeGuess(event.key)
    wordEl.textContent = game_one.puzzle
    remainingGuessesEl.textContent = game_one.remainingGuesses
    statusEl.textContent = game_one.status_message
  }
})
