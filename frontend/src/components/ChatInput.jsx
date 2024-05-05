import React, { useState } from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import { FaFaceSmile } from 'react-icons/fa6'
import { IoIosSend } from 'react-icons/io'
import { GoPaperclip } from 'react-icons/go'

const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [msg, setMsg] = useState('')
  const [mediaFile, setMediaFile] = useState(null)
  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleEmojiClick = event => {
    let message = msg
    message += event.emoji

    setMsg(message)
  }
  const handleFileChange = event => {
    const file = event.target.files[0];
    setMediaFile(file)
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (msg.length > 0) {
      handleSendMsg(msg, mediaFile)
      setMsg('')
      setMediaFile(null)
    }
  }

  return (
    <Container>
      <div className='button'>
        <div className='emoji'>
          <FaFaceSmile onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            <Picker
              className='emoji-picker-react'
              onEmojiClick={handleEmojiClick}
            />
          )}
        </div>
      </div>
      <div className='media'>
        {' '}
        <input
          type='file'
          id='mediaInput'
          accept='image/*, video/*'
          className='file-handle'
          onChange={handleFileChange}
        />
        <label htmlFor='mediaInput' className='file-button'>
          <GoPaperclip />
        </label>
      </div>

      <form className='input-container' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='type your message here...'
          value={msg}
          onChange={e => {
            setMsg(e.target.value)
          }}
        />
        <button className='submit' type='submit'>
          <IoIosSend />
        </button>
      </form>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 10% 80%;
  background-color: #ffffff;
  padding: 0 2rem;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  .emoji {
    position: relative;
    svg {
      font-size: 1.5rem;
      color: #000000c7;
      cursor: pointer;
    }
    .emoji-picker-react {
      position: absolute;
      top: -450px;
      left: 50px;
      background-color: #e4e2f1;
      box-shadow: 0 5px 10px #000000;
      border-color: #000000;
      .emoji-scroll-wrapper::-webkit-scrollbar {
        background-color: #080420;
        width: 5px;
        &-thumb {
          background-color: #9a86f3;
        }
      }
      .emoji-categories {
        button {
          filter: contrast(0);
        }
      }
      .emoji-search {
        background-color: transparent;
        border-color: #9a86f3;
      }
      .emoji-group:before {
        background-color: #080420;
      }
    }
  }
  .media{
   input[type="file"] {
  display: none;
  }

.file-button {
  padding:.6em;
  border-radius: 2rem;
  display: flex;
  box-sizing:border-box;
  justify-content: center;
  align-items: center;
  background-color:transparent;
  cursor: pointer;
}

 .file-button svg {
  font-size: 1.5rem;
  color: #000000;
}

  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #82797934;
    input {
      width: 90%;
      height: 60%;
      color: #000000;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      background-color: transparent;

      &::selection {
        background-color: #d7c8c8;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 1.5rem;
        color: #000000;
      }
    }
  }
`

export default ChatInput
