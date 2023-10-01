import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import styled from 'styled-components'
import SinglePost from './SinglePost'
import { useState,useEffect } from 'react'
import {axiosInstance} from '../config'
import Navbar from './Navbar'
import CommentSection from "./CommentSection"
import Reel from './Reel'
import { Link } from 'react-router-dom';

const ReelsSection = ({socket}) => {

    const [open,setOpen]=useState(false)
    const [fetch,setFetch]=useState(false)
    const [index,setIndex]=useState(0)
    const [openComment, setOpenComment] = useState(false)
    const [reels,setReels]=useState([])    
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

  <Back to='/' >
  <KeyboardBackspaceIcon htmlColor='white' fontSize="medium" />
  </Back>
   
 
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
   height: 79vh;
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

    
`
const Back=styled(Link)`
 position: fixed;
  top: 15px;
  left: 15px;
  background-color:transparent;
  opacity:0;
  cursor: pointer;
  z-index: 999;
  display: none;
  @media screen and (max-width:768px){
        opacity: 1;
        display: block;
    };
`





