import socket from '../socket'
/**
 * ACTION TYPES
 */
const LOAD_LOBBY_INFO = 'LOAD_LOBBY_INFO'

/**
 * INITIAL STATE
 */
const initialState = {
  lobby: {
    total: 0,
    rooms: []
  }
}

/**
 * ACTION CREATORS
 */
export const loadLobbyInfo = info => ({
  lobby: info,
  type: LOAD_LOBBY_INFO
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
        lobby: {...action.lobby}
      }
    default:
      return state
  }
}
