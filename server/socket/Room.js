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
    }
    addHost(socket) {
      this.addPlayer(socket)
      this.host = socket
    }
    addPlayer(socket) {
      this.players[socket.id] = socket
    }
    basicInfo() {
      return {
        name: this.name,
        host: this.host.data.name,
        playerCount: Object.keys(this.players).length,
        spectatorCount: Object.keys(this.specators).length
      }
    }
  }
}
