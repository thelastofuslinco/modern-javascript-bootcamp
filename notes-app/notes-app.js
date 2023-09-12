console.log('from a diferent file')

const paragraph = document.querySelector('p')
console.log(paragraph)

const paragraphs = document.querySelectorAll('p')
paragraphs.forEach((paragraph) => (paragraph.textContent = 'New content'))
