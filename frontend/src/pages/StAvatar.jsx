import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify' // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { setAvatarRoute } from '../utils/apiRoutes'
import { Buffer } from 'buffer';
import loader from "./../assets/loader.gif"
const StAvatar = () => {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: 'top-right',
    autoClose: 6000,
    pauseOnHover: true,
    theme: 'dark'
  };

  // Define setProfilePicture function within the component body
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {

      const userData = localStorage.getItem("chat-login-details");
      const USER = JSON.parse(userData);
      console.log(USER);
      const { data } = await axios.post(`${setAvatarRoute}/${USER.data.USER._id}`, {
        image: avatars[selectedAvatar] // Use 'selectedAvatar' instead of 'setSelectedAvatar'
      });
      
      if (data.isSet) {
        USER.data.USER.isAvatarImageSet = true;
        USER.data.USER.avatarImage = data.image;
        localStorage.setItem("chat-login-details", JSON.stringify(USER));
        console.log(USER);
        navigate("/chat");
      } else {
        toast.error("Error in setting avatar. Please try again", toastOptions);
      }
    }
  };
  useEffect(() => {
    const checkLocalStorage = async () => {
      if (!localStorage.getItem("chat-login-details")) {
        navigate("/login");
      }
    };
    
    checkLocalStorage();
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const image = await axios.get(
            `${api}/${Math.round(Math.random() * 1000)}`
          );
          const buffer = new Buffer(image.data);
          data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching avatars:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>{  isLoading ? <Container>
      <img src={loader} alt="loading" className="loader" />
    </Container>  :
     (
    <Container>
      <ToastContainer {...toastOptions} />
      <div className="title-container">
        <h1>Pick your avatar</h1>
      </div>
      <div className="avatars">
        {avatars.map((avatar, index) => (
          <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
           <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
          </div>
        ))}
      </div>
      <button onClick={setProfilePicture} className="submit-btn">
        Set as Profile Picture
      </button>
    </Container>)
 } </>
  );
};

export default StAvatar;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #f3f3f6;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: #000000;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #010101;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #000000;
    }
  }
`
