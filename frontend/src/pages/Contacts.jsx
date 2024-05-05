import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

const Contacts = ({contacts,currentUser,changeChat}) => {
  const [currentUsername,setcurrentUsername]=useState(undefined);
  const [currentUserImage,setcurrentUserImage]=useState(undefined);
  const [currentSelected,setcurrentSelected]=useState(undefined);
 useEffect(()=>{
  if(currentUser){
    setcurrentUserImage(currentUser.avatarImage);
    setcurrentUsername(currentUser.username);
  }
 },[currentUser]);
 const changCurrentChat=(index,contact)=>{
   setcurrentSelected(index);
   changeChat(contact);
 }
  return (
   <>
   {
    currentUserImage && currentUsername ? (<Container>
      <div className="brand">
        <h1>Lets Grow</h1>
      </div>
      <div className="search">
        <input type="text" placeholder='search user....' />
      </div>
      <div className="contacts">
        {
          contacts.map((contact,index)=>{
            return (
              <div className={`contact ${
                index === currentSelected ? "selected" :""
              }`}key={index} onClick={()=>changCurrentChat(index,contact)}>
                <div className="avatar">
                  <img  src={`data:image/svg+xml;base64,${contact.avatarImage}`}/>
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="current-user">
      <div className="avatar">
                  <img  src={`data:image/svg+xml;base64,${currentUserImage}`}/>
                </div>
                <div className="username">
                  <h1>{currentUsername}</h1>
                </div>
      </div>
    </Container>):(<div></div>)
   }
   </>
  )
}

export default Contacts;
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 8% 72% 10%;
  overflow: hidden;
  border-radius:.9em;
  background-color:rgba(217, 209, 209, 0.504);
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color:rgba(218, 5, 5);
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .search {
    display: flex;
    align-items: center;
    color:black;
    justify-content: center;
    input {
      width: 95%;
      padding: 0.5rem;
      border: none;
      color:white;
      border: .1em solid black;
      border-radius: 0.3rem;
      outline: none;
      
    }}
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #15121239;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: rgba(26, 25, 25, 0.504);
      min-height: 1rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #cf5b5b;
    }
  }

  .current-user {
    background-color: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 3rem;
      }
    }
    .username {
      h1 {
        color: white;
        font-size:1.5rem;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
