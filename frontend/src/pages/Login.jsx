import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios"
import { loginRoute } from '../utils/apiRoutes'
import Signup from './Signup'

const Login = () => {
  const navigate = useNavigate(); // useNavigate hook inside the functional component
  
  const [registerValues, setRegisterValues] = useState({
    username: '',
    password: '',
  })
 useEffect(()=>{
  if(localStorage.getItem("chat-login-details")){
    navigate('/chat')
  }
 },[]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if form values are valid
    if (validation()) {
      const { username,  password } = registerValues;
    
        // Make a POST request to register the user
         await axios.post(loginRoute, {
          username,
          
          password,
          
        }).then(res => {console.log(res.data)
          toast.success("successfully registered",toastOptions);
          localStorage.setItem("chat-login-details",JSON.stringify(res))
          navigate("/chat");
        })
        .catch(err=>{
          console.log(err);
          const message =err.response.data.message || "something went wrong" ;
          toast.error(message,toastOptions)
        })
       
        
        
      } 
    };
  
  

  
  const toastOptions = {
    position: 'top-right',
    autoClose: 6000,
    pauseOnHover: true,
    theme: 'dark'
  }

  const validation = () => {
    const { username, password } = registerValues
    if (password === "") {
      toast.error('username and password cant be empty', toastOptions)
      return false
    } else if (username === "") {
      toast.error('username and password cant be empty', toastOptions)
      return false
    } 
    return true;
  }

  const handleChange = e => {
    // Setting register values
    setRegisterValues({ ...registerValues, [e.target.name]: e.target.value })
  }

  return (
    <>
      <ToastContainer />
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className='brand'>
            <h1>Lets Grow...</h1>
          </div>
          <input
            type='text'
            placeholder='Username'
            name='username'
            value={registerValues.username}
            onChange={handleChange}
            min="3"          />
          
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={registerValues.password}
            onChange={handleChange}
          />
          
          <button type='submit'>Login</button>
          <span>
          not yet registered ?{' '}
            <Link to='/signup' element={<Signup />}>
              Signup
            </Link>
          </span>
        </form>
      </FormContainer>
    </>
  )
}

// Styling
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #00ABE1;

  .brand {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;

    h1 {
      color: red;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background:linear-gradient(135deg,rgb(255,255,255,0.1),rgb(255,255,255,0.1));
    backdrop-filter:blur(10px);
   -webkit-backdrop-filter:blur(10px);
    margin: 1rem 1rem 1rem 1rem;
    border-radius: 2rem;
    padding: 3rem 5rem;
    background-color:white;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #000000;
      border-radius: 0.4rem;
      color: #000000;
      font-size: 1rem;

      &:focus {
        border: 0.1rem solid #000000;
        outline: none;
      }
    }

    button {
      background-color:#161F6D;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0ms 0.5s ease-in-out;

      &:hover {
        background-color: #128c7e;
      }
    }
  }

  span {
    color: #000000;
    text-transform: uppercase;

    a {
      color: #020202;
      font-weight: bold;
      text-decoration: none;
    }
  }
`

export default Login;
