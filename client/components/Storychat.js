import date from 'date-and-time'
import React from 'react'
import {connect} from 'react-redux'
import {requestRoomStoryMessageCreate} from '../store'
import {ChatSkeleton} from './ChatSkeleton'
import './stylesheets/storychat.css'

const handleSubmit = (event, text, setText) => {
  event.preventDefault()
  requestRoomStoryMessageCreate(text)
  setText('')
}

const DisconnectedStorychat = props => {
  return (
    <ChatSkeleton
      messages={props.messages}
      title="Story Chat"
      handleSubmit={handleSubmit}
      canSendMessage={text => {
        const curPlayer = props.players[props.curPlayerIdx]
        return props.userId === curPlayer.id && text.length > 0
      }}
      titleGen={msg => {
        const time = new Date(msg.time)
        return `${date.format(time, 'hh:mm A')} - ${msg.from}`
      }}
      msgGen={msg => {
        return (
          <div className="msg-container">
            <div className="roll-container">
              <div className={'roll ' + msg.dieClass} />
            </div>
            {msg.message}
          </div>
        )
      }}
    />
  )
}

export const StoryChat = connect(state => ({
  userId: state.user.id,
  curPlayerIdx: state.socket.room.curPlayer,
  players: state.socket.room.players,
  messages: state.socket.room.storyMessages
}))(DisconnectedStorychat)
