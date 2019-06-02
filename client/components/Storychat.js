import date from 'date-and-time'
import React from 'react'
import {connect} from 'react-redux'
import {requestRoomStoryMessageCreate} from '../store'
import {ChatSkeleton} from './ChatSkeleton'

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
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              borderBottom: '1px solid black'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div
                className={msg.dieClass}
                style={{
                  backgroundImage: 'url("/story_cubes.jpg")',
                  transform: 'scale(0.5)'
                }}
              />
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
