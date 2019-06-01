import React from 'react'
import {requestRoomMessageCreate} from '../store'
import {ChatSkeleton} from './ChatSkeleton'

const handleSubmit = (event, text, setText) => {
  event.preventDefault()
  requestRoomMessageCreate(text)
  setText('')
}

export const Sidechat = props => {
  return (
    <ChatSkeleton
      messages={props.messages}
      title="Room Chat"
      handleSubmit={handleSubmit}
      classes={props.classes}
    />
  )
}
