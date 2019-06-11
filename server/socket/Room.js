const genId = require('../id')
const genPrompt = require('./prompt')
const die = require('./die')
const MIN_PLAYERS = 2
const MAX_PLAYERS = 4
const MAX_CHARS_FOR_MSG = 160 // screw twitter

module.exports = function (io) {
  class Room {
    constructor(name, size = MIN_PLAYERS) {
      this.clients = {}
      this.name = name
      this.id = genId()
      this.uniqueName = `room-#${this.id}`
      this.messages = []
    }

    addMessage(message, from) {
      if (message.length === 0 || message.length > MAX_CHARS_FOR_MSG) {
        return
      }
      const msg = {
        message,
        from,
        id: genId(),
        time: Date.now()
      }
      this.messages.push(msg)
      io.to(this.uniqueName).emit('room_message_single', msg)
    }

    sendAllMessagesTo(socket) {
      socket.emit('room_message_all', this.messages)
    }

    addClient(socket) {
      const numPlayers = Object.keys(this.clients).length

      this.clients[socket.id] = socket

      // some socket stuff for the original person
      socket.leave('lobby')
      socket.join(this.uniqueName)
      socket.data.room = this
      socket.data.timeJoinedRoom = Date.now()
      socket.emit('res_room_join', this.expandedInfo())
      // now everyone else in the room can know
      socket.to(this.uniqueName).emit('room_player_update', this.expandedInfo())
      // and the lobby
      io.to('lobby').emit('lobby_room_update', this.basicInfo())
      // and we'll add a message and share that. but socket needs them all
      this.sendAllMessagesTo(socket)
      this.addMessage(`${socket.data.name} has joined!`)
    }

    // returns true if no more client in room
    // false otherwise
    // if empty, need to be deleted manually and everyone informed
    // this only informs if >0 players in room
    removePlayer(socket) {
      delete this.clients[socket.id]

      socket.leave(this.uniqueName)
      socket.join('lobby')
      delete socket.data.room
      delete socket.data.timeJoinedRoom
      // tell everyone else that room has changed
      socket.to(this.uniqueName).emit('room_player_update', this.expandedInfo())
      io.to('lobby').emit('lobby_room_update', this.basicInfo())
      return Object.keys(this.clients).length === 0
    }

    expandedInfo() {
      return {
        id: this.id,
        name: this.name,
        clients: Object.keys(this.clients).map(k => ({
          name: this.clients[k].data.name,
          id: this.clients[k].data.id
        })),
      }
    }

    basicInfo() {
      return {
        id: this.id,
        name: this.name,
        clientCount: Object.keys(this.clients).length,
      }
    }
  }

  class RoomList {
    constructor() {
      this.rooms = {}
    }

    basicInfo() {
      return Object.keys(this.rooms).map(k => this.rooms[k].basicInfo())
    }

    newRoom(info) {
      const room = new Room(info.name, info.size)
      this.rooms[room.id] = room
      return room
    }

    findById(id) {
      return this.rooms[id]
    }

    removeRoom(id) {
      delete this.rooms[id]
      io.to('lobby').emit('lobby_room_remove', id)
    }

    // utility to remove and delete room if needed
    removePlayer(socket, id) {
      const room = this.findById(id)
      if (!room) {
        return socket.emit(
          'err',
          'Could not leave requested room because it doesn not exist'
        )
      }
      const isEmpty = room.removePlayer(socket)

      if (isEmpty) {
        this.removeRoom(room.id)
      }
    }
  }
  return {
    Room,
    RoomList
  }
}
