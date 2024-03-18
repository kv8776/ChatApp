import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { getAllMsgRoute, sendMsgRoute } from '../utils/apiRoutes';

import ChatInput from './ChatInput';

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
 const handleSendMsg = async (msg) => {
    try {
      socket.current.emit('send-msg', {
        to: currentChat._id,
        from: currentUser._id,
        message: msg
      });
      await axios.post(sendMsgRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat && socket.current) {
          const res = await axios.post(getAllMsgRoute, {
            from: currentUser._id,
            to: currentChat._id
          });
          setMessages(res.data.messages);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    getMessages();
  }, [currentChat?._id, socket.current,handleSendMsg]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-receive', msg => {
        console.log("message vachindi bro");
        setMessages(prevMessages => [...prevMessages, msg]);
      });
    }
  }, [socket]);

 
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Container>
      <div className='chat-messages'>
        {messages.map((msg, index) => (
          <div key={index}>
            <div className={`msg ${msg.fromSelf ? 'sent' : 'received'}`}>
              <div className='content'>
                <p>{msg.message}</p>
              </div>
            </div>
            {index === messages.length - 1 && <div ref={scrollRef}></div>}
          </div>
        ))}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
};

export default ChatContainer;

const Container = styled.div`
  display: grid;
  grid-template-rows: 80% 20%;
  gap: 0.1rem;
  overflow: hidden;

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;

    .msg {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 1rem;

      &.received {
        justify-content: flex-start;
      }

      .content {
        padding: 0.4em;
        border-radius: 0.5rem;
        background-color: #113baf1f; /* Sent messages background color */
      }
    }
  }
`;
