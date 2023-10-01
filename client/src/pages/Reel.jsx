import { Avatar } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styled from 'styled-components'
import FavoriteIcon from '@mui/icons-material/Favorite';
import whiteComment from "../assets/whiteComment.svg"
import whiteSend from "../assets/whiteSend.svg"
import whiteSave from "../assets/whiteSave.svg"
import { StyledLink } from '../App';
import { useState,useEffect } from 'react'
import {axiosInstance} from '../config'
import {useSelector} from "react-redux"
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRef } from 'react';



const Reel = ({setFetch,fetch,item,muted,setIndex,setMuted,setOpen,setOpenComment,socket,index,id}) => {
  const user = useSelector(state=>state.user.currentUser)
  const [likes,setLikes]=useState([])
  const [clicked,setClicked]=useState(false)
  const isLiked=likes?.find(like=>like===user._id)
  const darkMode=useSelector(state=>state.darkMode)
  const videoRef = useRef(null)
 

  useEffect(() => {
   const options = {
     root: document.getElementById(id), // Use the viewport as the root
     rootMargin: '0px',
     threshold: 0.7, // Fire the callback when at least 70% of the video is visible
   };
 
     const handleIntersection = (entries) => {
       entries.forEach((entry) => {
        
         if (entry.isIntersecting) {
         
          videoRef?.current?.play()
       
           
         } else {
        if ( videoRef?.current  ) videoRef.current.currentTime = 0;
           videoRef?.current?.pause();
         }
       });
     };
 
     const observer = new IntersectionObserver(handleIntersection,options);
 
    
       observer.observe(videoRef?.current);
    
 
     return () => {
       observer.disconnect();
     };
   }, []);

  const handleLike=async(post)=>{
    const  message={profileId:post.postId,reelId:post._id,text:`${user.username} liked your reel`}
      try{
         await axiosInstance.put("/posts/like/"+post._id, {userId:user._id}, {headers:{ token: "Bearer "+user.accessToken}})
        if(isLiked && post.postId!==user?._id){  socket?.current?.emit('postLiked',  message ) 
      await axiosInstance.post('/noti/create',{notificationId:post.reelId,message}, {headers:{ token: "Bearer "+user.accessToken}})
      }
       setFetch(!fetch)
       
       setClicked(false)
      }catch(e){
          console.log(e)
      }
  }


  useEffect(()=>{
    setLikes(item.likes)
  },[item])

useEffect(()=>{
  clicked&&handleLike(item)
},[clicked])



  return (
    <Container    darkMode={darkMode}>

<Button onClick={()=>setMuted(!muted)}>{muted?<VolumeOffIcon htmlColor='white' />:<VolumeUpIcon htmlColor='white' />}</Button>

<Video onClick={()=>{setIndex(index);setOpen(true)}}   muted={muted}  ref={videoRef}  loop darkMode={darkMode}  src={item.video} />

       <Options darkMode={darkMode}>

       <Section>
            {
          isLiked  ?     <  FavoriteIcon htmlColor="crimson" onClick={()=>{setLikes(likes.filter(l=>l!==user?._id));setClicked(true)}} />  
                  : <  FavoriteBorderIcon htmlColor='white'  onClick={()=>{setLikes(n=>[...n,user?._id]);setClicked(true)}} />  
                  }
                   <span>{likes.length}</span>
                  
                   </Section>
                   <Section>
  

  <img  src={whiteComment} alt="" onClick={()=>{setOpenComment(true);setIndex(index);setOpen(true)}} /> 
 
         <span  onClick={()=>{setIndex(index);setOpen(true);setOpenComment(true)}}> {item.comments?.length} </span>
      
        
       
         
         </Section>
         <Section> <img src={whiteSend} alt="" /></Section>
         <Section>  <img src={whiteSave} alt="" /></Section>
         <Section><MoreVertIcon htmlColor='white'/></Section>

          
          </Options>

  <Bottom>
  <StyledLink   to={`/account/?user=${item.reelId}`}> 
            <User>

        <Avatar src={item.profilePic}/> 
    <span style={{color:'white'}}>{item.username} </span>
    
            </User>
            </StyledLink>
            <span style={{color:'#f6f5f7',fontSize:'14px'}}>
              {item.caption}
            </span>

            
      
    </Bottom>
    </Container>
  )
}

export default Reel



const Container=styled.div`
    display: flex;
    width: 27vw;
    min-height: 79vh;
   
    scroll-snap-align: start;
    
   position: relative;
   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border-radius: 10px;
    
    margin-inline: auto;
    align-items: start;
    background-color: black;
    &:hover{
      &>button{
        opacity: 1;
      }
    }
    @media screen and (max-width:768px){
        width: 100vw;
        min-height: 93vh;
        border: none;
        border-radius: 0;
       
    }
`
const Options=styled.div`
    display: flex;
    flex-direction: column;
   align-items: center;
   gap: 15px;
   position: absolute;
   right: 0;
   padding: 10px;
   bottom: 8px;
   z-index: 2;
   color:'white';
   @media screen and (max-width:768px){
        padding: 0 15px;
        bottom: 40px;
        
    }
   &>*{
        cursor: pointer;
    }
`
const Section=styled.span`
    display: flex;
    flex-direction: column;
   align-items: center;
   gap: 3px;
 color: white;
`

const Video=styled.video`
box-shadow: 2px 2px 4px 2px #f0efee;
box-shadow: ${props=>props.darkMode&&'-0.5px -0.5px 2px 1px #191919'};
    border-radius: 10px;
    width: 100%;
   height: 100%;
padding: 0;
object-fit: cover;
@media screen and (max-width:768px){
        border-radius: 0;
        box-shadow: none;
        
    }
`
const Button=styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  border:none;
  background-color:transparent;
  opacity:0;
  transition: all 0.5s ease;
  cursor: pointer;
  z-index: 999;
  @media screen and (max-width:768px){
        opacity: 1;
        
    }
`


const User=styled.div`
   display: flex;
 
   gap: 8px;
   font-size: 16px;
   align-items: center;
  
   @media screen and (max-width:768px){
       
        gap: 8px;
        font-size: 18px;
    }
`
const Bottom=styled.div`
    display: flex;
   gap: 8px;
   flex-direction: column;
  
   position:absolute;
   bottom: 18px;
   
   padding-left: 15px;
   @media screen and (max-width:768px){
       bottom: 40px;
       padding-left: 18px;
    }
   
`


