import socket from '../socket'

/**
 * ACTION TYPES
 */
const LOAD_ROOM = 'LOAD_ROOM'
const LOAD_MESSAGES = 'LOAD_MESSAGES'
const LOAD_MESSAGE = 'LOAD_MESSAGE'

/**
 * INITIAL STATE
 */
const initialState = {
  id: 0,
  host: {},
  name: '',
  size: 0,
  players: [],
  spectators: [],
  messages: [],
  storyMessages: [],
  prompt: '',
  state: '',
  curPlayer: -1
}

/**
 * ACTION CREATORS
 */
export const roomUpdate = room => ({
  room,
  type: LOAD_ROOM
})
export const loadMessages = messages => ({
  messages,
  type: LOAD_MESSAGES
})
export const loadMessage = message => ({
  message,
  type: LOAD_MESSAGE
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
export const requestRoomMessageCreate = text => {
  socket.emit('req_room_message_create', text)
}
export const requestRoomGameStart = () => {
  socket.emit('req_room_game_start')
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
    case LOAD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message]
      }
    case LOAD_MESSAGES:
      return {
        ...state,
        messages: action.messages
      }
    default:
      return state
  }
}
