import {Fab, Grid, List, ListItemText, Paper} from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import {makeStyles} from '@material-ui/core/styles'
import NavBackIcon from '@material-ui/icons/NavigateBefore'
import React from 'react'
import history from '../history'
import {requestRoomLeave} from '../store'
import {Sidechat} from './Sidechat'
import {StoryChat} from './Storychat'
import './stylesheets/die.css'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    maxWidth: 1200,
    margin: 'auto'
  },
  paper: {
    padding: theme.spacing(2),
    maxWidth: 800
  },
  fab: {
    margin: theme.spacing(1),
    minWidth: 40
  },
  listitem: {
    marginRight: theme.spacing(2),
    minWidth: 24,
    minHeight: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ul: {
    listStyle: 'none'
  },
  dieCont: {
    width: 128,
    height: 128,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  die: {
    backgroundImage: 'url("/story_cubes.jpg")'
  },
  prompt: {
    width: '100%',
    textAlign: 'center'
  },
  self: {
    '& > span': {
      fontWeight: 700
    }
  }
}))
export const Ingame = props => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Grid item container spacing={2} xs={12}>
        <Grid item container xs={2} sm={1} alignItems="center" justify="center">
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
        <Grid item container xs={10} sm={11}>
          {/*prompt space */}
          <Paper className={classes.prompt}>
            <p>{props.prompt}</p>
          </Paper>
        </Grid>
      </Grid>
      <Grid item container xs={12} spacing={2}>
        {/* Player list & dice roll */}
        <Grid item container xs={12} md={3} direction="column" spacing={1}>
          <Grid item container justify="center">
            <Paper className={classes.dieCont}>
              <div className={classes.die + ' ' + props.dieClass} />
            </Paper>
          </Grid>
          <Grid item container justify="center">
            <Paper className={classes.paper}>
              <List>
                {props.players.map((player, idx) => {
                  const isTurn = props.curPlayer === idx
                  const isSelf = props.user.id === player.id
                  return (
                    <ListItem key={player.id} justify="space-between">
                      <div className={classes.listitem}>
                        {isTurn ? (
                          <i className="material-icons">keyboard_arrow_right</i>
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>
                      <ListItemText
                        primary={player.name}
                        className={isSelf ? classes.self : ''}
                      />
                    </ListItem>
                  )
                })}
              </List>
            </Paper>
          </Grid>
        </Grid>
        {/* story  */}
        <Grid item container xs={12} md={9}>
          <StoryChat />
        </Grid>
        {/* Side chat */}
        <Grid item container xs={12}>
          <Sidechat messages={props.messages} />
        </Grid>
      </Grid>
    </Paper>
  )
}
