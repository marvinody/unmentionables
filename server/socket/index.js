const genName = require('./name')
const id = require('../id')

module.exports = io => {
  // we need to give it io cause room manages some socket stuff for us
  const {RoomList, Room} = require('./Room')(io)
  let totalConnected = 0
  const rooms = new RoomList()
  io.on('connection', socket => {
    // update total count for lobby stats
    totalConnected++

    socket.join('lobby')

    socket.on('req_lobby_info', () => {
      socket.emit('res_lobby_info', {
        total: totalConnected,
        rooms: rooms.basicInfo()
      })
    })

    socket.data = {} // we'll use this to hold all our own data
    // so we don't overwrite any internals
    // I checked already, this is unused
    socket.data.name = genName()
    socket.data.id = id()
    socket.on('req_user_info', () => {
      socket.emit('res_user_info', {
        name: socket.data.name
      })
    })

    socket.on('req_lobby_create', info => {
      socket.leave('lobby')
      const room = rooms.newRoom(info)
      // room will update everyone for us if we give it io
      room.addHost(socket, io)
      // and let's update everyone in the lobby that new room has been created
      io.to('lobby').emit('lobby_room_create', room.basicInfo())
    })

    socket.on('disconnect', () => {
      totalConnected--
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
