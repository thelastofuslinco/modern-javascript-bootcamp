const promise = (data) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (data) resolve(data)
      else reject(new Error('provide a data'))
    }, 2000)
  )

promise('aaa').then(console.log).catch(console.error)
