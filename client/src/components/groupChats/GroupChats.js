import './groupChats.css'
import React from 'react'

const GroupChats = (props) => {
  const { groupChats, selectedChat, selectChat } = props

  return (
    <div className="group-chats">
      {groupChats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => selectChat(chat)}
          className={`group-chat ${
            selectedChat && selectedChat.id === chat.id
              ? 'active-group-chat'
              : ''
          }`}
        >
          {chat.name}
        </div>
      ))}
    </div>
  )
}

export default GroupChats
