const fs = require('fs')
const readline = require('readline')
const {join} = require('path')

// this whole file lets me read the classes dynamically
// incase I change the structure later
//
const wrapper = function() {
  this.classes = []
  this.init()
}

const cssFile = join(
  __dirname,
  '..',
  '..',
  'client',
  'components',
  'stylesheets',
  'die.css'
)

wrapper.prototype.init = async function() {
  const fileStream = fs.createReadStream(cssFile)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    const search = /\.(\w+)/.exec(line)
    if (search && search.length > 1) {
      this.classes.push(search[1])
    }
  }
}

wrapper.prototype.roll = function() {
  const len = this.classes.length
  return this.classes[Math.floor(Math.random() * len)]
}
module.exports = new wrapper()
