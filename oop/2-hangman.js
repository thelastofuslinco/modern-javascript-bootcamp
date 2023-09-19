class Hangman {
  constructor(word, remainingGuesses) {
    this.word = word.toLowerCase().split('')
    this.remainingGuesses = remainingGuesses
    this.guessedLetters = []
    this.status = 'playing'
  }

  get puzzle() {
    let puzzle = ''

    this.word.forEach((letter) => {
      if (this.guessedLetters.includes(letter) || letter === ' ') {
        puzzle += letter
      } else {
        puzzle += '*'
      }
    })

    return puzzle
  }

  get status_message() {
    switch (this.status) {
      case 'finished':
        return `Great work! You guessed the word.`
      case 'failed':
        return `Nice try! The word was "${this.word.join('')}".`
      default:
        return `Guesses left: ${this.remainingGuesses}.`
    }
  }

  calcStatus() {
    const isFinished = this.word.every(
      (single) => this.guessedLetters.includes(single) || single === ' '
    )
    const guessLimit = this.remainingGuesses <= 0

    if (isFinished && this.status !== 'failed') {
      this.status = 'finished'
    } else if (guessLimit) {
      this.status = 'failed'
    }
  }

  makeGuess(guess) {
    guess = guess.toLowerCase()
    const isUnique = !this.guessedLetters.includes(guess)
    const isBadWord = !this.word.includes(guess)

    if (isUnique) {
      this.guessedLetters.push(guess)
      isBadWord && this.remainingGuesses--
      this.calcStatus()
    }
  }
}
