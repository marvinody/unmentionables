import {makeStyles} from '@material-ui/core/styles'
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {requestRoomJoin} from '../store'
import {Pregame} from './Pregame'

const ROOM_PREGAME = 'ROOM_PREGAME'
const ROOM_INGAME = 'ROOM_INGAME'

/**
 * COMPONENT
 */
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    marginTop: theme.spacing(2),
    maxWidth: 800
  },
  fab: {
    margin: theme.spacing(1)
  },
  listitem: {
    paddingRight: theme.spacing(2)
  },
  ul: {
    listStyle: 'none'
  }
}))
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
    return <span>Not implemented</span>
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
