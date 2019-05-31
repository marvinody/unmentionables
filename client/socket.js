import io from 'socket.io-client'
import history from './history'
import store, {
  createSingleLobby,
  removeSingleLobby,
  roomUpdate,
  updateSingleLobby
} from './store'
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
  socket.on('res_lobby_create', room => {
    history.push(`/rooms/${room.id}`)
  })
  socket.on('res_room_join', room => {
    store.dispatch(roomUpdate(room))
  })

  /*
  * Server Responders
  * These are mainly to deal with others changing the data and the server
  * pushing it out to the clients
  * */
  socket.on('lobby_room_create', room => {
    store.dispatch(createSingleLobby(room))
  })

  socket.on('lobby_room_remove', id => {
    store.dispatch(removeSingleLobby(id))
  })

  socket.on('lobby_room_update', room => {
    store.dispatch(updateSingleLobby(room))
  })

  socket.on('room_player_update', room => {
    store.dispatch(roomUpdate(room))
  })

  socket.on('err', msg => {
    console.error(msg)
  })
})

export default socket
