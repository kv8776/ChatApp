import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { getAllMsgRoute, sendMsgRoute } from '../utils/apiRoutes'
import ChatInput from './ChatInput'
import Logout from './Logout';

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([])
  const messagesContainerRef = useRef(null)

  const handleSendMsg = async msg => {
    try {
      bringIntoView();
      socket.current.emit('send-msg', {
        to: currentChat._id,
        from: currentUser._id,
        message: msg
      })
      await axios.post(sendMsgRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg
      })
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }
  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-receive', msg => {
        setMessages(prevMessages => [...prevMessages, msg])
        bringIntoView();
      })
    }
  }, [socket])
  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat && socket.current) {
          const res = await axios.post(getAllMsgRoute, {
            from: currentUser._id,
            to: currentChat._id
          })
          setMessages(res.data.messages);
        }
      } catch (error) {
        console.error('Error fetching messages:', error)
      }
    }

    getMessages()
  }, [currentChat?._id, socket.current, handleSendMsg])


  const bringIntoView = () => {
    messagesContainerRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Container>
      <div className='header'>
        <div className='user-details'>
          <div className='avatar'>
            <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} />
          </div>
          <div className='username'>
            <h3>{currentUser.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className='chat-messages'>
        {messages.map((msg, index) => (
          <div
            ref={messagesContainerRef}
            key={index}
            className={`${msg.fromSelf ? 'sent' : 'received'}`}
          >
            <div className='content'>
              <p>{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  )
}

export default ChatContainer

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  .header {
    display: flex;
    background-color:whitesmoke;
    justify-content:space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap:1rem;
      .avatar{
        img{
          height:3rem;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
  }

  .received {
    display: flex;
    margin-bottom: 1rem;
    justify-content: flex-start;
  }

  .sent {
    display: flex;
    margin-bottom: 1rem;
    justify-content: flex-end;
  }

  .content {
    padding: 0.4em;
    border-radius: 0.5rem;
    background-color: #113baf1f;
  }
`
