import socket from '../socket'
/**
 * ACTION TYPES
 */
const LOAD_LOBBY_INFO = 'LOAD_LOBBY_INFO'
const UPDATE_SINGLE_LOBBY = 'UPDATE_SINGLE_LOBBY'
const CREATE_SINGLE_LOBBY = 'CREATE_SINGLE_LOBBY'
const REMOVE_SINGLE_LOBBY = 'REMOVE_SINGLE_LOBBY'

/**
 * INITIAL STATE
 */
const initialState = {
  total: 0,
  rooms: []
}

/**
 * ACTION CREATORS
 */
export const loadLobbyInfo = info => ({
  lobby: info,
  type: LOAD_LOBBY_INFO
})

export const updateSingleLobby = room => ({
  room,
  type: UPDATE_SINGLE_LOBBY
})

export const createSingleLobby = room => ({
  room,
  type: CREATE_SINGLE_LOBBY
})

export const removeSingleLobby = id => ({
  id,
  type: REMOVE_SINGLE_LOBBY
})

/**
 * THUNK CREATORS
 */
export const requestLobbyInfo = () => {
  socket.emit('req_lobby_info')
}
export const requestLobbyCreate = info => {
  socket.emit('req_lobby_create', info)
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_LOBBY_INFO:
      return {
        ...state,
        ...action.lobby
      }
    case UPDATE_SINGLE_LOBBY:
      return {
        ...state,
        rooms: state.rooms.map(room => {
          if (room.id === action.room.id) {
            return action.room
          }
          return room
        })
      }
    case CREATE_SINGLE_LOBBY:
      return {
        ...state,
        rooms: [action.room, ...state.rooms]
      }
    case REMOVE_SINGLE_LOBBY:
      return {
        ...state,
        rooms: state.rooms.filter(r => r.id !== action.id)
      }
    default:
      return state
  }
}
