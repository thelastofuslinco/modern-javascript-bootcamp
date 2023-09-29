const request = {
  get(url) {
    return new Promise((resolve, reject) => {
      const xmlRequest = new XMLHttpRequest()
      xmlRequest.open('GET', url)
      xmlRequest.addEventListener('readystatechange', (event) => {
        if (event.target.readyState === 4 && event.target.status === 200) {
          resolve(JSON.parse(event.target.responseText))
        } else if (event.target.readyState === 4) {
          reject(JSON.parse(event.target.responseText))
        }
      })
      xmlRequest.send()
    })
  }
}

const new_request = {
  async get(url) {
    const response = await fetch(url)

    if (response.status === 200) {
      return response.json()
    } else {
      throw new Error('Unable to fetch data')
    }
  }
}
