const printTeam = (team, coach, ...players) => {
  return `Team: ${team}; Coach: ${coach}; Players: ${players.join(', ')}`
}

const players = ['Marge', 'Aiden', 'Herbert', 'Sherry']
const team = {
  name: 'Liberty',
  coach: 'Casey Penn',
  players: [...players]
}

console.log({ ...team })

console.log(printTeam(team.name, team.coach, ...players))
