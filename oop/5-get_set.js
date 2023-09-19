const data = {
  locations: [],
  get location() {
    return this._location
  },
  set location(location) {
    this._location = location.trim()
    this.locations.push(this._location)
  }
}

data.location = 'Philadelphia'

console.log(data.location)
