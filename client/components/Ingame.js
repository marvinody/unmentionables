import {Fab, Grid, List, ListItemText, Paper} from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import {makeStyles} from '@material-ui/core/styles'
import NavBackIcon from '@material-ui/icons/NavigateBefore'
import React from 'react'
import history from '../history'
import {requestRoomLeave} from '../store'
import {Sidechat} from './Sidechat'
import {StoryChat} from './Storychat'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
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
export const Ingame = props => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item container xs={12}>
          <Grid item container xs={1} alignItems="center">
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
          <Grid item container xs={11}>
            {/*prompt space */}
            <Paper className={classes.paper}>
              <p>{props.prompt}</p>
            </Paper>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          {/* Player list & dice roll */}
          <Grid item container xs={3}>
            <Paper className={classes.paper}>
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
            </Paper>
          </Grid>
          {/* story  */}
          <Grid item container xs={5}>
            <StoryChat />
          </Grid>
          {/* Side chat */}
          <Grid item container xs={4}>
            <Sidechat messages={props.messages} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}
