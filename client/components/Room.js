import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {requestRoomJoin} from '../store'
import {Ingame} from './Ingame'
import {Pregame} from './Pregame'

const ROOM_PREGAME = 'ROOM_PREGAME'
const ROOM_INGAME = 'ROOM_INGAME'

/**
 * COMPONENT
 */
export const Room = props => {
  useEffect(() => {
    requestRoomJoin(props.match.params.id)
  }, [])
  if (!props.id) {
    return <div>Loading room...</div>
  }
  if (props.state === ROOM_PREGAME) {
    return <Pregame {...props} />
  } else {
    return <Ingame {...props} />
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    ...state.socket.room,
    id: state.socket.room.id
  }
}

export default connect(mapState)(Room)
