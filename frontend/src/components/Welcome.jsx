import React from 'react'
import styled from 'styled-components'
import welcome from "./../assets/welcome.gif"
const Welcome = (currentUser) => {
  return (
    <Container>
        <img src={welcome} alt="gif" />
        <h1>
            Welcome <span>{currentUser.username}</span>
        </h1>
       
    </Container>
  )
}

export default Welcome;
const Container=styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
color:black;
h1{
    color:black;
}
img{
    height:20rem;
}
span{
    color:black;
}`
