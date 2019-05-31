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

    // TODO - check if game in progress, if yes add to spectator
    addPlayer(socket) {
      const numPlayers = Object.keys(this.players).length
      if (numPlayers === 0) {
        this.host = socket
        this.players[socket.id] = socket
      } else if (numPlayers === this.size) {
        this.spectators[socket.id] = socket
      } else {
        this.players[socket.id] = socket
      }
      socket.leave('lobby')
      socket.join(this.uniqueName)
      socket.data.room = this
      socket.data.timeJoinedRoom = Date.now()
      socket.emit('res_room_join', this.expandedInfo())
      socket.to(this.uniqueName).emit('room_player_update', this.expandedInfo())
    }

    removePlayer(socket) {
      console.log('removing player')
      const isPlayer = this.players[socket.id] !== undefined
      const isSpectator = this.spectators[socket.id] !== undefined
      if (isPlayer) {
        delete this.players[socket.id]
        this.upgradeSpectator()
      } else if (isSpectator) {
        delete this.spectators[socket.id]
      }
      socket.leave(this.uniqueName)
      socket.join('lobby')
      delete socket.data.room
      delete socket.data.timeJoinedRoom
      // tell everyone else that room has changed
      socket.to(this.uniqueName).emit('room_player_update', this.expandedInfo())
    }

    // this should only be called when a player leaves
    // TODO - check if game is in progress, if yes, do nothing
    upgradeSpectator() {
      const spectKeys = Object.keys(this.spectators)
      if (spectKeys.length === 0) {
        // nothing to do
        return
      }
      const oldestSpectator = spectKeys
        .map(k => this.spectators[k])
        .sort((a, b) => a.data.timeJoinedRoom - b.data.timeJoinedRoom)[0]

      delete this.spectators[oldestSpectator.id]
      this.players[oldestSpectator.id] = oldestSpectator
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
