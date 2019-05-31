import io from 'socket.io-client'
import store, {createSingleLobby} from './store'
import {loadLobbyInfo, loadUserInfo} from './store/'
const socket = io(window.location.origin)

socket.on('connect', () => {
  /*
  * Client Responders
  * These are mainly to deal with events that have been initiated by client
  */
  socket.on('res_lobby_info', info => {
    store.dispatch(loadLobbyInfo(info))
  })
  socket.on('res_user_info', info => {
    store.dispatch(loadUserInfo(info))
  })

  /*
  * Server Responders
  * These are mainly to deal with others changing the data and the server
  * pushing it out to the clients
  * */
  socket.on('lobby_room_create', room => {
    console.log('room:', room)
    store.dispatch(createSingleLobby(room))
  })
})

export default socket
