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
    />
  )
}

export const StoryChat = connect(state => ({
  userId: state.user.id,
  curPlayerIdx: state.socket.room.curPlayer,
  players: state.socket.room.players,
  messages: state.socket.room.storyMessages
}))(DisconnectedStorychat)
