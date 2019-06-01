import {
  Box,
  Button,
  Fab,
  Grid,
  IconButton,
  Input,
  List,
  ListItemText,
  Paper
} from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import {makeStyles} from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import NavBackIcon from '@material-ui/icons/NavigateBefore'
import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import history from '../history'
import {
  requestRoomJoin,
  requestRoomLeave,
  requestRoomMessageCreate,
  requestRoomGameStart
} from '../store'

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
  const classes = useStyles()
  useEffect(() => {
    requestRoomJoin(props.match.params.id)
  }, [])
  const [text, setText] = useState('')
  if (!props.id) {
    return <div>Loading room...</div>
  }
  if (props.state === ROOM_PREGAME) {
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
            <Grid item xs={11} container direction="row">
              <Grid item container xs={12} direction="row">
                <Grid item xs={6} sm={3}>
                  <p>{props.name}</p>
                </Grid>
                <Grid xs={6} item sm={3}>
                  <p>
                    {props.players.length}/{props.size} players
                  </p>
                </Grid>
                <Grid xs={6} item sm={3}>
                  <p>{props.spectators.length} spectators</p>
                </Grid>
                <Grid xs={6} item sm={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={props.players.length !== props.size}
                    onClick={requestRoomGameStart}
                  >
                    Start
                  </Button>
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
          </Grid>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} container>
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
                <form onSubmit={e => handleSubmit(e, text, setText)}>
                  <Input
                    name="text"
                    value={text}
                    onChange={e => setText(e.target.value)}
                  />
                  <IconButton type="submit" disabled={text.length === 0}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  } else {
    return <span>Not implemented</span>
  }
}

const handleSubmit = (event, text, setText) => {
  event.preventDefault()
  requestRoomMessageCreate(text)
  setText('')
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
