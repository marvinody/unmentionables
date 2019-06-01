import {Box, Grid, IconButton, Input, Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import React, {useState} from 'react'
import {requestRoomMessageCreate} from '../store'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 800
  },
  listitem: {
    paddingRight: theme.spacing(2)
  },
  ul: {
    listStyle: 'none'
  }
}))

const handleSubmit = (event, text, setText) => {
  event.preventDefault()
  requestRoomMessageCreate(text)
  setText('')
}

export const Sidechat = props => {
  const classes = useStyles()
  const [text, setText] = useState('')
  return (
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
  )
}
