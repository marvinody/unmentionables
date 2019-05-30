module.exports = (function() {
  let id = 1
  return function() {
    return id++
  }
})()
