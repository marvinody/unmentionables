const genName = require('./name')
const genId = require('../id')

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
    socket.data.id = genId()
    socket.on('req_user_info', () => {
      socket.emit('res_user_info', {
        name: socket.data.name
      })
    })

    socket.on('req_lobby_create', info => {
      const room = rooms.newRoom(info)
      socket.emit('res_lobby_create', room.basicInfo())
      io.to('lobby').emit('lobby_room_create', room.basicInfo())
    })

    socket.on('req_room_join', id => {
      // room will update the client for us
      const room = rooms.findById(id)
      if (!room) {
        return socket.emit('err', 'Cannot find room')
      }
      room.addPlayer(socket)
    })

    socket.on('req_room_leave', id => {
      rooms.removePlayer(socket, id)
    })

    socket.on('req_room_message_create', text => {
      if (!socket.data.room) {
        return
      }
      socket.data.room.addMessage(text, socket.data.name)
    })

    socket.on('req_room_story_message_create', text => {
      if (!socket.data.room) {
        return
      }
      socket.data.room.addStoryMessage(text, socket)
    })

    socket.on('req_room_game_start', () => {
      if (!socket.data.room) {
        return
      }
      socket.data.room.setState('ROOM_INGAME')
    })

    socket.on('disconnect', () => {
      totalConnected--
      if (socket.data.room) {
        // some cleanup
        rooms.removePlayer(socket, socket.data.room.id)
      }
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
