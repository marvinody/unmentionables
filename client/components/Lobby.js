import React from 'react'
import {connect} from 'react-redux'
import {requestLobbyInfo, requestUserInfo} from '../store'

/**
 * COMPONENT
 */
export class Lobby extends React.Component {
  render() {
    if (!this.props.isLoaded) {
      return <div>Loading...</div>
    }
    const {user, lobby} = this.props
    return (
      <div>
        <h3>Welcome, {user.name}</h3>
        <h4>{lobby.total} players online</h4>
        <div className="room wrapper">
          <div className="room count">{lobby.rooms.length} room(s)</div>
          <div className="room list">
            {lobby.rooms.map(room => (
              <div className="room info" key={room.id}>
                <span className="room name">{room.name}</span>
                <span className="room count">
                  {room.playerCount}/{room.size}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    requestLobbyInfo()
    requestUserInfo()
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoaded: !!state.user.name,
    user: state.user,
    lobby: state.socket.lobby
  }
}

export default connect(mapState)(Lobby)
