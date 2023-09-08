const gradeCalc = (score, total) => {
  const percent = (score / total) * 100
  let grade

  if (percent >= 90 && percent <= 100) grade = 'A'
  else if (percent >= 80 && percent <= 89) grade = 'B'
  else if (percent >= 70 && percent <= 79) grade = 'C'
  else if (percent >= 60 && percent <= 69) grade = 'D'
  else grade = 'F'

  return `You got a ${grade} (${percent}%)!`
}

console.log(gradeCalc(15, 20))
