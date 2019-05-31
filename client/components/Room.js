import {
  Box,
  Fab,
  Grid,
  Input,
  List,
  ListItemText,
  Paper
} from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import {makeStyles} from '@material-ui/core/styles'
import NavBackIcon from '@material-ui/icons/NavigateBefore'
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import history from '../history'
import {requestRoomJoin, requestRoomLeave} from '../store'

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
          <Grid item sm={1} md={1}>
            <Fab
              size="small"
              onClick={() => {
                requestRoomLeave(props.id)
                history.push('/')
              }}
              color="primary"
              aria-label="Go Back"
              className={classes.fab}
            >
              <NavBackIcon />
            </Fab>
          </Grid>
          <Grid item xs={11} md={5} container direction="row">
            <Grid item container xs={12} direction="row">
              <Grid item xs={6}>
                {props.name}
              </Grid>
              <Grid item xs={6} container>
                <Grid xs={12} item>
                  {props.players.length}/{props.size} players
                </Grid>
                <Grid xs={12} item>
                  {props.spectators.length} spectators
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={12}>
              <Grid xs={12} item>
                Players:
              </Grid>
              <Grid container item xs={12}>
                <List>
                  {props.players.map((player, idx) => (
                    <ListItem key={player.id} justify="space-between">
                      <ListItemText
                        className={classes.listitem}
                        primary={idx + 1}
                      />
                      <ListItemText primary={player.name} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} container>
            <span>Chat</span>
            <Box>
              <ul className={classes.ul}>
                {props.messages.map(msg => {
                  return (
                    <li key={msg.id}>
                      {msg.from}: {msg.message}
                    </li>
                  )
                })}
              </ul>
              <Input multiline />
            </Box>
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
