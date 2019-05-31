import {TextField} from '@material-ui/core'
import Fab from '@material-ui/core/Fab'
import {makeStyles} from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import React, {useState} from 'react'
import {connect} from 'react-redux'
import {requestLobbyCreate} from '../store'
/**
 * COMPONENT
 */
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  input: {
    margin: theme.spacing(1)
  },
  fab: {
    margin: theme.spacing(1)
  }
}))
export const CreateRoom = props => {
  const classes = useStyles()
  const [roomName, setRoomName] = useState(`${props.username}'s room`)
  const [size, setSize] = useState(2)
  const [canClick, setCanClick] = useState(true)
  if (canClick) {
    // if set to true, let's check if needs to be false
    if (roomName.length === 0 || size < 2 || size > 4) {
      setCanClick(false)
    }
  } else if (roomName.length > 0 && (size >= 2 && size <= 4)) {
    setCanClick(true)
  }
  return (
    <div className={classes.container}>
      <TextField
        id="roomname"
        label="Room Name"
        required
        placeholder="Room Name"
        value={roomName}
        onChange={e => setRoomName(e.target.value)}
        className={classes.input}
        inputProps={{
          'aria-label': 'Description'
        }}
      />
      <TextField
        id="size"
        required
        label="Max Players (2-4)"
        value={size}
        type="number"
        onChange={e => setSize(e.target.value)}
        className={classes.input}
        inputProps={{
          'aria-label': 'Description',
          max: 4,
          min: 2
        }}
      />
      <Fab
        onClick={() => {
          requestLobbyCreate({
            name: roomName,
            size
          })
          setRoomName('')
          setSize('')
        }}
        disabled={!canClick}
        color="primary"
        aria-label="Add"
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {}
}

export default connect(mapState)(CreateRoom)
