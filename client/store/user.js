import socket from '../socket'

/**
 * ACTION TYPES
 */
const LOAD_USER_INFO = 'LOAD_USER_INFO'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
export const loadUserInfo = user => ({type: LOAD_USER_INFO, user})

export const requestUserInfo = () => {
  socket.emit('req_user_info')
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case LOAD_USER_INFO:
      return action.user
    default:
      return state
  }
}
