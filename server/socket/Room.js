const id = require('../id')
const MIN_PLAYERS = 2
const MAX_PLAYERS = 4

class Room {
  constructor(name, size = MIN_PLAYERS) {
    this.players = {}
    this.specators = {}
    this.host = {}
    this.name = name
    this.id = id()
    this.size = Math.max(MIN_PLAYERS, Math.min(MAX_PLAYERS, size))
    this.uniqueName = `room-#${this.id}`
  }

  addHost(socket) {
    this.addPlayer(socket)
    this.host = socket
    socket.join(this.uniqueName)
  }

  addPlayer(socket) {
    this.players[socket.id] = socket
    socket.data.room = this
  }

  basicInfo() {
    return {
      id: this.id,
      name: this.name,
      host: this.host.data.name,
      size: this.size,
      playerCount: Object.keys(this.players).length,
      spectatorCount: Object.keys(this.specators).length
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
}
module.exports = {
  Room,
  RoomList
}
