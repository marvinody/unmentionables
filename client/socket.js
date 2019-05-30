import io from 'socket.io-client'
import store from './store'
import {loadLobbyInfo} from './store/socket'
const socket = io(window.location.origin)

socket.on('connect', () => {
  // request some data to display
  socket.on('res_lobby_info', info => {
    store.dispatch(loadLobbyInfo(info))
  })
})

export default socket
