import axios from 'axios'
import React from 'react'
import styled from 'styled-components'
import { useNavigate} from "react-router-dom"
import { IoLogOutOutline } from "react-icons/io5";
const Logout = () => {
    const navigate=useNavigate();
    const handleClick =async ()=>{
        localStorage.clear();
        navigate("/login");
    }
        
    
  return (
    <Button>
   <IoLogOutOutline onClick={handleClick}/>
</Button>
  )
}

export default Logout;
const Button =styled.div`
display:flex;
justify-self:center;
align-items:center;
padding:0.5rem;
border-bottom:.5rem;
background-color:#ffffff;
border:none;
cursor:pointer;
svg{
    font-size:1.3rem;
    color:#111011
}
`