import {Grid, IconButton, Input, Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import React, {useState} from 'react'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    marginTop: theme.spacing(2),
    maxWidth: 800
  },
  listitem: {
    paddingRight: theme.spacing(2)
  },
  outerMessages: {
    display: 'flex',
    flexDirection: 'column-reverse',
    height: 480
  },
  messages: {
    overflow: 'auto',
    width: '100%',
    height: 480
  },
  span: {
    margin: 'auto'
  }
}))

export const ChatSkeleton = props => {
  const classes = useStyles()
  const [text, setText] = useState('')
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={1} direction="column">
        <Grid item xs={12} className={classes.span}>
          <span>{props.title}</span>
        </Grid>
        <Grid item xs={12} container>
          <div className={classes.messages}>
            {props.messages.map(msg => {
              return (
                <div key={msg.id}>
                  {msg.from}: {msg.message}
                </div>
              )
            })}
          </div>
          <form onSubmit={event => props.handleSubmit(event, text, setText)}>
            <Input
              name="message"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <IconButton type="submit" disabled={text.length === 0}>
              <AddIcon fontSize="small" />
            </IconButton>
          </form>
        </Grid>
      </Grid>
    </Paper>
  )
}
