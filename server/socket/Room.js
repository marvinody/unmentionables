const id = require('../id')
const MIN_PLAYERS = 2
const MAX_PLAYERS = 4

module.exports = {
  RoomList: class RoomList {
    constructor() {
      this.rooms = {}
    }
    basicInfo() {
      return Object.keys(this.rooms).map(k => this.rooms[k].basicInfo())
    }
  },
  Room: class Room {
    constructor(name) {
      this.players = {}
      this.specators = {}
      this.host = {}
      this.name = name
      this.id = id()
      this.size = MIN_PLAYERS
    }
    addHost(socket) {
      this.addPlayer(socket)
      this.host = socket
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
}
