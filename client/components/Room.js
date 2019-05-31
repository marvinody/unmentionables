import {Grid, Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {requestRoomJoin} from '../store'
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
    maxWidth: 800
  }
}))
export const Room = props => {
  const classes = useStyles()
  useEffect(() => {
    requestRoomJoin(props.match.params.id)
  }, [])
  if (!props.id) {
    return <div>Loading room...</div>
  }
  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md container>
            <div>ROOM DATA</div>
          </Grid>
          <Grid item xs={12} md container>
            <div>CHATROOM</div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
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
