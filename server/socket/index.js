const genName = require('./name')

const {RoomList, Room} = require('./Room')
module.exports = io => {
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
    socket.on('req_user_info', () => {
      socket.emit('res_user_info', {
        name: socket.data.name
      })
    })

    socket.on('req_lobby_create', info => {
      socket.leave('lobby')
      const room = rooms.newRoom(info)
      room.addHost(socket)
      // and let's update everyone in the lobby that new room has been created
      io.to('lobby').emit('lobby_room_create', room.basicInfo())
    })

    socket.on('disconnect', () => {
      totalConnected--
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
