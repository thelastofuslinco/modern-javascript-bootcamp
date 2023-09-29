const promise = (number) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (typeof number === 'number') resolve(number * 2)
      else reject(new Error('Provide a number'))
    }, 2000)
  )

const fetchData = async () => {
  const data1 = await promise(2)
  const data2 = await promise(data1)
  const data3 = await promise(data2)

  return data3
}

fetchData()
  .then((response) => console.log(response))
  .catch(console.error)
