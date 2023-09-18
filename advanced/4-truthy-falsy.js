const array = [false, 0, '', null, undefined, NaN]

array.forEach((element) => {
  !element && console.log(element)
})
