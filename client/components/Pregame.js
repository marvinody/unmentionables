import {Button, Fab, Grid, List, ListItemText, Paper} from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import {makeStyles} from '@material-ui/core/styles'
import NavBackIcon from '@material-ui/icons/NavigateBefore'
import React from 'react'
import history from '../history'
import {requestRoomGameStart, requestRoomLeave} from '../store'
import {Sidechat} from './Sidechat'

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
    margin: theme.spacing(1),
    minWidth: 40
  },
  listitem: {
    paddingRight: theme.spacing(2)
  },
  ul: {
    listStyle: 'none'
  },
  sidechat: {
    margin: 'auto',
    marginTop: theme.spacing(2)
  }
}))

export const Pregame = props => {
  const classes = useStyles()

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
      {/* TODO make this not hardcoded with 16
        maybe make it a fn that takes in theme and returns obj?
      */}
      <Sidechat
        messages={props.messages}
        classes={{
          chat: {
            margin: 'auto',
            marginTop: '16px',
            padding: '16px',
            maxWidth: 800
          }
        }}
      />
    </div>
  )
}
