const genId = require('../id')
const MIN_PLAYERS = 2
const MAX_PLAYERS = 4

module.exports = function(io) {
  class Room {
    constructor(name, size = MIN_PLAYERS) {
      this.players = {}
      this.spectators = {}
      this.host = {}
      this.name = name
      this.id = genId()
      this.size = Math.max(MIN_PLAYERS, Math.min(MAX_PLAYERS, size))
      this.uniqueName = `room-#${this.id}`
    }

    addPlayer(socket) {
      if (Object.keys(this.players).length === 0) {
        this.host = socket
      }
      this.players[socket.id] = socket
      socket.join(this.uniqueName)
      socket.data.room = this
      socket.emit('res_room_join', this.expandedInfo())
      // socket.to(room.uniqueName).emit('')
    }

    expandedInfo() {
      return {
        id: this.id,
        name: this.name,
        host: {
          name: this.host.data.name,
          id: this.host.data.id
        },
        size: this.size,
        players: Object.keys(this.players).map(k => ({
          name: this.players[k].data.name,
          id: this.players[k].data.id
        })),
        spectators: Object.keys(this.spectators).map(k => ({
          name: this.spectators[k].data.name,
          id: this.spectators[k].data.id
        }))
      }
    }

    basicInfo() {
      return {
        id: this.id,
        name: this.name,
        size: this.size,
        playerCount: Object.keys(this.players).length,
        spectatorCount: Object.keys(this.spectators).length
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
  }
  return {
    Room,
    RoomList
  }
}
