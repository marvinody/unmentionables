import io from 'socket.io-client'
import store from './store'
import {loadLobbyInfo} from './store/socket'
import {loadUserInfo} from './store/user'
const socket = io(window.location.origin)

socket.on('connect', () => {
  // request some data to display
  socket.on('res_lobby_info', info => {
    store.dispatch(loadLobbyInfo(info))
  })
  socket.on('res_user_info', info => {
    store.dispatch(loadUserInfo(info))
  })
})

export default socket
