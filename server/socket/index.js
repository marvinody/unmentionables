const genName = require('./name')
const {RoomList, Room} = require('./Room')
module.exports = io => {
  let totalConnected = 0
  const rooms = new RoomList()
  io.on('connection', socket => {
    // update total count for lobby stats
    totalConnected++

    socket.on('req_lobby_info', () => {
      console.log('requested info')
      socket.emit('res_lobby_info', {
        total: totalConnected,
        rooms: rooms.basicInfo()
      })
    })

    socket.data = {} // we'll use this to hold all our own data
    // so we don't overwrite any internals
    // I checked already, this is unused
    socket.data.name = genName()

    socket.on('disconnect', () => {
      totalConnected--
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
