import {Grid, IconButton, Input, Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import date from 'date-and-time'
import React, {useState} from 'react'

const useStyles = customClasses =>
  makeStyles(theme => ({
    chat: {
      padding: theme.spacing(2),
      width: '100%'
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
    },
    form: {
      width: '100%',
      display: 'flex'
    },
    input: {
      flex: '1'
    },
    button: {
      minWidth: 64
    },
    ...customClasses
  }))

export const ChatSkeleton = props => {
  const classes = useStyles(props.classes || {})()
  const [text, setText] = useState('')
  const titleGen =
    props.titleGen || (msg => date.format(new Date(msg.time), 'hh:mm A'))
  const msgGen = props.msgGen || (msg => `${msg.from || ''}: ${msg.message}`)
  const canSendMessage = props.canSendMessage || (text => text.length > 0)
  return (
    <Paper className={classes.chat}>
      <Grid container spacing={1} direction="column">
        <Grid item xs={12} className={classes.span}>
          <span>{props.title}</span>
        </Grid>
        <Grid item xs={12} container>
          <div className={classes.messages}>
            {props.messages.map(msg => {
              return (
                <div key={msg.id} title={titleGen(msg)}>
                  {msgGen(msg)}
                </div>
              )
            })}
          </div>
          <form
            onSubmit={event => props.handleSubmit(event, text, setText)}
            className={classes.form}
          >
            <Input
              name="message"
              value={text}
              onChange={e => setText(e.target.value)}
              className={classes.input}
            />
            <IconButton
              type="submit"
              disabled={!canSendMessage(text)}
              color="primary"
              className={classes.button}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </form>
        </Grid>
      </Grid>
    </Paper>
  )
}
