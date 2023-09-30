import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom"
import { Link } from 'react-router-dom'
import styled from "styled-components"
import { useRef, useEffect, Suspense} from "react"
import {  useSelector } from "react-redux"
import {io} from "socket.io-client"
import { lazy } from "react"
import './pages/loader.css'
import photo from "./assets/asset 0.png"
import photo1 from "./assets/asset 1.png"



const Home = lazy(()=>import("./pages/Home"))
const Explore = lazy(()=>import("./pages/Explore"))
const Account = lazy(()=>import("./pages/Account"))
const Message = lazy(()=>import("./pages/Message"))
const ReelsSection = lazy(()=>import("./pages/ReelsSection"))
const Login = lazy(()=>import("./pages/Login"))
const Register = lazy(()=>import("./pages/Register"))

const App = () => {
const user=useSelector(state=>state.user.currentUser)
const socket = useRef(io('ws://localhost:8900'))
const darkMode=useSelector(state=>state.darkMode)

useEffect(() => {
  
 user && socket?.current?.emit('addUser', user?._id);

},[user]);


  return (
    <Container darkMode={darkMode} >

  <Router >

  <Suspense fallback={
 
    <Div>
  <img src={photo} alt="" />
  <Bottom  src={photo1} />
   
    </Div>
   
  
 
}>
        <Routes>
            <Route exact path="/" element={!user? <Navigate to="/login"/>  :<Home socket={socket}/>}/>
            <Route  path="/explore" element={!user? <Navigate to="/login"/>:<Explore socket={socket}/>}/>
            <Route  path="/reels" element={!user? <Navigate to="/login"/>:<ReelsSection socket={socket}/>}/>
            <Route  path="direct-inbox" element={!user? <Navigate to="/login"/>:<Message  socket={socket}/>}/>
            <Route  path="/account/" element={!user? <Navigate to="/login"/>:<Account  socket={socket}/>}/>
            <Route  path="/sign-up" element={user? <Navigate to="/"/>  :<Register/>}/>
            <Route  path="/login" element={user? <Navigate to="/"/>  :<Login/>}/>
        </Routes>
    </Suspense>

        </Router>
    

 
        </Container>
  )
}

export default App

const Container=styled.div`
    display: flex;
    width: 100vw;
   
 
    justify-content: space-between;
    background-color: ${props=>props.darkMode&&'black'};
    min-height: 100vh;
    color: ${props=>props.darkMode&&'white'};
    
`

export const StyledLink=styled(Link)`
text-decoration: none;
color: #3d3d3d;
color:${props=>props.darkMode&&'white'};
`

const Div = styled.div`
display: flex;
width: 100vw;
height: 100vh;
align-items: center;
justify-content: center;
position: relative;
&>img{
  width: 5vw;
  @media screen and (max-width:768px) {
    width: 18vw;
  }
}
`

const Bottom = styled.img`
bottom: 4vh;
  position: absolute;
  @media screen and (max-width:768px) {
    width: 17vw;
  }
`