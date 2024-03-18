import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Contacts from './Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from "socket.io-client";
import { allUserRoute, host } from '../utils/apiRoutes';

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const setUser = async () => {
      if (!localStorage.getItem("chat-login-details")) {
        navigate('/login');
      } else {
        const userData = JSON.parse(localStorage.getItem("chat-login-details"));
        setCurrentUser(userData.data.USER);
        setIsLoaded(true);
      }
    };
    setUser();
  }, [navigate]);

  useEffect(() => {
    if (currentUser && currentUser._id) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser && currentUser._id) {
        try {
          const response = await axios.get(`${allUserRoute}/${currentUser._id}`);
          setContacts(response.data.users);
        } catch (error) {
          console.error('Error fetching contacts:', error);
        }
      }
    };
    fetchContacts();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      {contacts.length > 0 && (
        <Container>
          <div className="container">
            <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
            {isLoaded && currentChat === undefined ? (<Welcome currentUser={currentUser}/>) : (<ChatContainer currentUser={currentUser} currentChat={currentChat} socket={socket}/>)}
          </div>
        </Container>
      )}
    </>
  );
}

export default Chat;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #37a1b6;
  .container {
    height: 95vh;
    width: 95vw;
    border-radius: 0.9em;
    background-color: #ffffff;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
