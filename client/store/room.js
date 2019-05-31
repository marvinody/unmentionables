import socket from '../socket'

/**
 * ACTION TYPES
 */
const LOAD_ROOM = 'LOAD_ROOM'

/**
 * INITIAL STATE
 */
const initialState = {
  id: 0,
  host: {},
  name: '',
  size: 0,
  players: [],
  spectators: []
}

/**
 * ACTION CREATORS
 */
export const roomUpdate = room => ({
  room,
  type: LOAD_ROOM
})

/**
 * THUNK CREATORS
 */
export const requestRoomJoin = id => {
  socket.emit('req_room_join', id)
}
export const requestRoomLeave = id => {
  socket.emit('req_room_leave', id)
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_ROOM:
      return {
        ...state,
        ...action.room
      }
    default:
      return state
  }
}
