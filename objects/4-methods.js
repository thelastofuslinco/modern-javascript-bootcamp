const party = {
  name: 'ABC',
  guests: ['Lincoln', 'Jhon', 'Andrew'],
  partyInfo() {
    console.log(`Party ${this.name} Guests: ${this.guests.join(', ')}
    `)
  }
}

party.partyInfo()
