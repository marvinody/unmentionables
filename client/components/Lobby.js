import React from 'react'
import {connect} from 'react-redux'
import {requestLobbyInfo, requestUserInfo} from '../store'

/**
 * COMPONENT
 */
export class Lobby extends React.Component {
  render() {
    console.log('rendering')
    console.log('loaded:', this.props.isLoaded)
    console.log('props:', this.props)
    if (!this.props.isLoaded) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <h3>Welcome, {this.props.user.name}</h3>
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
