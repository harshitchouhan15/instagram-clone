
import styled from 'styled-components'
import SinglePost from './SinglePost'
import { useState,useEffect, useRef } from 'react'
import {axiosInstance} from '../config'
import {useSelector} from "react-redux"
import Navbar from './Navbar'
import CommentSection from "./CommentSection"
import Reel from './Reel'

const ReelsSection = ({socket}) => {
   // const user = useSelector(state=>state.user.currentUser)

    const [open,setOpen]=useState(false)
    const [fetch,setFetch]=useState(false)
    const [index,setIndex]=useState(0)
    const [openComment, setOpenComment] = useState(false)
    const [reels,setReels]=useState([])
    const darkMode=useSelector(state=>state.darkMode)
    
    const [muted,setMuted]=useState(true)
  

    
    useEffect(()=>{
    const getReels=async()=>{
        const res=await axiosInstance.get('/posts/all/reels')
        setReels(res.data)
    }
    getReels()
    },[fetch])
    
  return (

    <Flex>

<SinglePost open={open} socket={socket} setIndex={setIndex}
 index={index} length={reels.length} setOpen={setOpen} selected={reels[index]} fetch={fetch} setFetch={setFetch} />

        <Navbar socket={socket}  />

 <Container>
 <CommentSection  fetch={fetch} setFetch={setFetch} setOpenComment={setOpenComment} socket={socket} 
         openComment={openComment} selected={reels[index]}/>

      
                <Feed id='yourRootElement'>
                    {reels.map((item,i)=>(
                        <Reel key={i} setFetch={setFetch} fetch={fetch} socket={socket} 
                        setMuted={setMuted}  muted={muted} id='yourRootElement'
                          setIndex={setIndex} index={i} 
                         item={item}  setOpen={setOpen}  setOpenComment={setOpenComment} />
                    ))}
              
                </Feed>

                
 </Container>


 </Flex>
  )
}

export default ReelsSection

export const  Flex=styled.div`
display: flex;width: 100vw;
justify-content: space-between;
height: max-content;
`

const Container=styled.div`
   
    width: 84vw;
    
    display: flex;
  
    min-height: 100vh;
    align-items: center;
    justify-content: center;


    @media screen and (max-width:768px){
      width: 100vw;
    }
   
`



const Feed=styled.div`
    width: 30vw;
   height: 77vh;
   overflow-y: scroll;
display: flex;
flex-direction: column;
   scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
  &::-webkit-scrollbar{
    display: none;
  }
    
    @media screen and (max-width:768px){
       width: 100%;    
       height: 93vh;
    
    };

    &>:first-child{
        margin-top: 30px;
    };
    &>:last-child{
        margin-bottom: 30px;
    }

`
const Back=styled.span`
 font-size: 18px;
        font-weight: 400;
        background-color:white;
        background-color: ${props=>props.darkMode&&'black'};
        color: ${props=>props.darkMode&&'white'};
        position: fixed;
        display: none;
        align-items: center;
        padding-left: 10px;
        top: 0;
        z-index: 9999;
        gap: 12px;
        padding: 15px 12px;
        height: 7vh;
        width: 100vw;
        @media screen and (max-width:768px){
       display: flex;
    
    };

`





