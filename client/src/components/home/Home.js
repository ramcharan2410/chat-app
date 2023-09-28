import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import './home.css'
import { useState, useEffect, useRef } from 'react'
import UsersFriends from '../usersFriends/UsersFriends'
import Suggestions from '../suggestions/Suggestions'
import { IoMdSend } from 'react-icons/io'
import { io } from 'socket.io-client'
import Bubble from '../bubble/Bubble'
const address = 'http://localhost'
const debounce = (func, timeout = 10000) => {
  let timer
  let c = 0
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      console.log(c++)
      func.apply(this, args)
    }, timeout)
  }
}

const Home = (props) => {
  const [userData, setUserData] = useState({})
  const [name, setName] = useState('')
  const [nameSuggestions, setNameSuggestions] = useState({})
  const [userSocket, setUserSocket] = useState({})
  const [selectedUser, setSelectedUser] = useState({})
  const [userFriends, setUserFriends] = useState([])
  const [formMessage, setFormMessage] = useState('')
  const [messagesList, setMessagesList] = useState([])

  const chatCanvas = useRef(null)

  // Functions
  const nameHandler = async (event) => {
    const name = event.target.value
    setName(name)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${jwtToken}`,
      },
      body: JSON.stringify({ name }),
    }
    try {
      const response = await fetch(`${address}:3001/findwithname`, options)
      if (!response.ok) throw new Error(`Error ${response}`)
      else {
        const data = await response.json()
        setNameSuggestions(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const signout = () => {
    Cookies.remove('jwt_token')
    const { history } = props
    history.replace('/login')
  }

  const addingFriend = async (FriendData) => {
    if (!userFriends || userFriends.length === 0) {
      setUserFriends([FriendData])
      return
    }

    const index = userFriends.findIndex(
      (each) => each.email === FriendData.email
    )
    if (index !== -1) {
      setSelectedUser(FriendData)
    } else {
      setUserFriends((prev) => [FriendData, ...prev])
      const payload = {
        userEmail: userData.email,
        friendEmail: FriendData.email,
      }
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }

      try {
        const response = await fetch(`${address}:3001/addfriend`, options)
        if (response.ok) {
          const data = await response.json()
          console.log(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const getUserFriends = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(`${address}:3001/userFriends`, options)

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setUserFriends(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const sendMessageForm = async (event) => {
    event.preventDefault()

    if (formMessage !== '') {
      userSocket.emit(
        'send-message-to-friend',
        {
          message: formMessage,
          receiver: selectedUser.email,
        },
        (Id) => {
          const now = new Date()
          const nxtMsg = {
            id: Id,
            sender: userData.email,
            receiver: selectedUser.email,
            message_content: formMessage,
            time: now.toString(),
          }
          setMessagesList((prev) => [...prev, nxtMsg])
          setFormMessage('')
        }
      )
    }
  }

  const fetchChat = async (email) => {
    const sender = userData.email
    const receiver = email
    try {
      const response = await fetch(`${address}:3001/chat/${sender}/${receiver}`)
      const data = await response.json()
      setMessagesList(data)
    } catch (error) {
      console.error(error)
    }
  }

  const renderMessages = () => {
    if (messagesList.length === 0) return null
    return (
      <>
        {messagesList.map((each) => (
          <Bubble
            data={each}
            key={each.id}
            left={selectedUser.email === each.sender}
          />
        ))}
      </>
    )
  }

  const removeFriend = async (friendEmail) => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${jwtToken}`,
      },
      body: JSON.stringify({ friendEmail }),
    }

    try {
      const response = await fetch(`${address}:3001/removefriend`, options)

      if (response.ok) {
        setUserFriends((prev) =>
          prev.filter((friend) => friend.email !== friendEmail)
        )

        if (selectedUser.email === friendEmail) {
          setSelectedUser({})
          setMessagesList([])
        }
      } else {
        console.error('Failed to remove friend')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const clearChat = async () => {
    if (selectedUser.email) {
      const jwtToken = Cookies.get('jwt_token')
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${jwtToken}`,
        },
      }

      try {
        const response = await fetch(
          `${address}:3001/clear-chat/${userData.email}/${selectedUser.email}`,
          options
        )

        if (response.ok) {
          setMessagesList([])
        } else {
          console.error('Failed to clear chat')
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const notify = (data) => {
    const notification = new Notification(`Message from ${data.sender}`, {
      body: `${data.message_content}`,
      vibrate: [200, 100, 200, 100, 200],
    })
    notification.addEventListener('click', () => {
      const sender = userFriends.find((each) => each.email === data.sender)
      setSelectedUser(sender)
      fetchChat(data.sender)
      notification.close()
    })
    setTimeout(() => {
      notification.close()
    }, 5000)
  }

  // State changes
  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token')
    const userData = jwt_decode(jwtToken)

    setUserData({ ...userData })
    const socket = io(`${address}:3002/`, {
      auth: { token: jwtToken },
    })
    try {
      socket.on('connect', () => {
        setUserSocket(socket)
        console.log('socket id:', socket.id)
      })
      socket.on('get-friends', (data) => {
        if (Object.keys(userFriends).length === 0) {
          getUserFriends()
        } else {
          if (data.type === 1) {
            setUserFriends((prev) => {
              const newData = prev.map((each) => {
                if (each.email === data.email) {
                  return { ...each, socket_id: data.socket_id }
                }
                return each
              })
              return newData
            })
          } else {
            setUserFriends((prev) => {
              const newData = prev.map((each) => {
                if (each.email === data.email) {
                  return { ...each, socket_id: null }
                }
                return each
              })
              return newData
            })
          }
        }
      })
    } catch (error) {
      console.log(error)
      alert('Something went wrong. Please reload')
    }

    getUserFriends()
  }, [])

  useEffect(() => {
    try {
      userSocket.on('send-message-to-friend', (data) => {
        if (selectedUser.email === data.sender) {
          setMessagesList((prev) => [...prev, data])
        } else {
          try {
            if ('Notification' in window) {
              if (Notification.permission === 'granted') {
                notify(data)
              } else {
                Notification.requestPermission().then((res) => {
                  if (res === 'granted') {
                    notify(data)
                  } else if (res === 'denied') {
                    console.error('Notification access denied :(')
                  } else {
                    console.warn(`The notification permission was not granted`)
                  }
                })
              }
            }
          } catch (error) {
            console.error(error)
          }
        }
      })
    } catch (error) {
      console.error(error)
    }
  }, [selectedUser, userSocket])

  useEffect(() => {
    const container = chatCanvas.current
    container.addEventListener('scroll', () => {
      if (
        container.scrollTop === 0 &&
        container.clientHeight < container.scrollHeight
      ) {
      }
    })
  }, [])

  useEffect(() => {
    const chatContainerRef = chatCanvas.current

    chatContainerRef.scrollTop = chatContainerRef.scrollHeight
  }, [messagesList])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <nav>
        <img src={userData.picture} alt="Profile pic" className="profile-pic" />
        <span className="app-name">Message App</span>
        <div className="search-with-name">
          <input
            type="search"
            className="name-input"
            placeholder="Search"
            value={name}
            onChange={(e) => debounce(nameHandler(e))}
          />
          {nameSuggestions.length > 0 && name.length > 0 && (
            <ul className="name-suggestions">
              {nameSuggestions.map((each) => (
                <Suggestions
                  data={each}
                  key={each.email}
                  addingFriend={addingFriend}
                  fetchChat={fetchChat}
                />
              ))}
            </ul>
          )}
        </div>
        <button onClick={signout} className="sign-out-btn">
          Sign out
        </button>
      </nav>

      <div className="ui">
        <div id="sidebar">
          <span className="chats">Chats</span>
          {userFriends.length > 0 ? (
            userFriends.map((each) => (
              <div
                key={each.email}
                className={`userFriend-header ${
                  selectedUser.email === each.email ? 'active-userfriend' : ''
                }`}
              >
                <UsersFriends
                  data={each}
                  selectedUserChanger={setSelectedUser}
                  fetchChat={fetchChat}
                  selectedUserEmail={selectedUser.email}
                />
                <button
                  onClick={() => removeFriend(each.email)}
                  className="remove-friend-button"
                >
                  Remove Friend
                </button>
              </div>
            ))
          ) : (
            <h1 className="no-friends-found">No Friends Found</h1>
          )}
        </div>

        <div
          id="chat-container"
          style={{
            display: selectedUser.email === undefined ? 'none' : 'block',
          }}
        >
          <div className="chat-content" ref={chatCanvas}>
            <div className="chat-header">
              <h2>{selectedUser.name}</h2>
              <button onClick={clearChat} className="clear-chat-button">
                Clear Chat
              </button>
            </div>
            {renderMessages()}
          </div>

          <div>
            <form onSubmit={sendMessageForm} className="messageInputForm">
              <input
                type="text"
                placeholder="Type a message"
                className="message-input"
                value={formMessage}
                onChange={(e) => {
                  setFormMessage(e.target.value)
                }}
              />
              <button type="submit" className="message-sender">
                <IoMdSend style={{ fontSize: '35px' }} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
