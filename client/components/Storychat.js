import React from 'react'
import {connect} from 'react-redux'
import {ChatSkeleton} from './ChatSkeleton'

const handleSubmit = (event, text, setText) => {
  event.preventDefault()
  // requestRoomMessageCreate(text)

  setText('')
}

const DisconnectedStorychat = props => {
  return (
    <ChatSkeleton
      messages={props.messages}
      title="Story Chat"
      handleSubmit={handleSubmit}
      canSendMessage={text => {
        return (
          props.userId === props.players[props.curPlayerIdx] && text.length > 0
        )
      }}
    />
  )
}

export const StoryChat = connect(state => ({
  userId: state.user.id,
  curPlayerIdx: state.socket.room.curPlayer,
  players: state.socket.room.players
}))(DisconnectedStorychat)
