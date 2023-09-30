import { Avatar } from '@mui/material'
import whiteComment from "../assets/whiteComment.svg"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styled from 'styled-components'
import photo2 from "../assets/asset 22.svg"
import FavoriteIcon from '@mui/icons-material/Favorite';
import photo4 from "../assets/asset 26.svg"
import photo5 from "../assets/asset 28.svg"
import { StyledLink } from '../App';
import { useState,useEffect, useRef } from 'react'
import {axiosInstance} from '../config'
import {useSelector} from "react-redux"
import photo10 from "../assets/asset 29.svg"
import whiteSave from "../assets/whiteSave.svg"
import whiteSend from "../assets/whiteSend.svg"
import { format } from 'timeago.js';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const HomePost = ({setFetch,fetch,item,setIndex,setOpen,setOpenComment,socket,index,setMuted,muted}) => {
  const user = useSelector(state=>state.user.currentUser)
  const [likes,setLikes]=useState(item.likes)
  const [clicked,setClicked]=useState(false)
  const isLiked=likes?.find(like=>like===user._id)
  const darkMode=useSelector(state=>state.darkMode)
  const postRef = useRef()
 const [isVisible,setIsVisible] = useState(false)
 const [isPlaying,setIsPlaying] =useState(false)

 const videoRef = useRef(null)




  useEffect(() => {

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        
        if (entry.isIntersecting) {
          
          setIsVisible(true)
         } else{
          setIsVisible(false)
         }
         
         
        })
      };
    

    const observer = new IntersectionObserver(handleIntersection);
    if(postRef?.current){
      
      observer.observe(postRef?.current)
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLike=async(post)=>{
    const  message={profileId:post.postId,postId:post._id,text:`${user.username} liked your post`}
      try{
        if(isLiked && post.postId!==user?._id){ 
          socket?.current?.emit('postLiked',  message ) 
     await axiosInstance.post('/noti/create',{notificationId:post.postId,message}, {headers:{ token: "Bearer "+user.accessToken}})
     }
          await axiosInstance.put("/posts/like/"+post._id, {userId:user._id}, {headers:{ token: "Bearer "+user.accessToken}})
      
       
       setFetch(!fetch)
       setClicked(false)
      }catch(e){
          console.log('')
      }
  }

  useEffect(()=>{
if(isVisible ){
    videoRef?.current?.play()
    setIsPlaying(true)
  }else{
    videoRef?.current?.pause();
    setIsPlaying(false)
  }

  },[isVisible])

  useEffect(()=>{
    setLikes(item.likes)
  },[item])

useEffect(()=>{
  clicked&&handleLike(item)
},[clicked])



const onVideoPress = ()=>{
  if(!isPlaying) {
    videoRef?.current.play()
    setIsPlaying(true)
  }else{
    videoRef?.current?.pause()
    setIsPlaying(false)
  }
 }

  return (
    <Post ref={postRef}  >
    
     
       
    <Top>
    <StyledLink  to={`/account/?user=${item.postId}`}> 
      <TopLeft>
        <Avatar src={item.profilePic}/> 
    <StyledLink darkMode={darkMode}>{item.username}</StyledLink>
    </TopLeft></StyledLink>
    <img  src={photo2} alt="" />
    </Top>

    <Center  >  
      {
        item.isReel && 
<><Button onClick={()=>setMuted(!muted)}>{muted?<VolumeOffIcon htmlColor='white' />:<VolumeUpIcon htmlColor='white' />}</Button>
 </>     
      }
      {
    
        
        item.isReel ?
        isVisible &&
        <Video onClick={onVideoPress} muted={muted}  
        
         ref={videoRef}    loop src={item.video} />
         :
         <Image onClick={()=>{setIndex(index);setOpen(true)}} src={item.image} />

    
      }
    </Center>

    <Bottom>
        <BottomTop>
            <BottomTopLeft>
       
            {
          isLiked  ?     <  FavoriteIcon htmlColor="crimson" onClick={()=>{setLikes(likes.filter(l=>l!==user?._id));setClicked(true)}} />  
                  : <  FavoriteBorderIcon  onClick={()=>{setLikes(n=>[...n,user?._id]);setClicked(true)}} />  
                  }

 

  <img  src={!darkMode?photo4:whiteComment} alt="" onClick={()=>{setOpenComment(true);setIndex(index);setOpen(true)}} /> 
 
       
        <img src={darkMode?whiteSend:photo5} alt="" onClick={()=>{setIndex(index);setOpen(true)}} />
            </BottomTopLeft>
          <Save src={darkMode?whiteSave:photo10}  />
        </BottomTop>
        <span>{likes.length} likes</span>
        <Caption><span>{item.username}</span> <p>{item.caption}</p></Caption>
        <Time darkMode={darkMode}>{format(item.createdAt)}</Time>
        <span onClick={()=>{setIndex(index);setOpen(true);setOpenComment(true)}}>view all {item.comments?.length} comments</span>
        <CommentInput darkMode={darkMode}  onClick={()=>{setIndex(index);setOpen(true)}} type="text" placeholder='Add a comment'/>
    </Bottom>
    </Post>
  )
}

export default HomePost
// const Play=styled.button`
//   position: absolute;
//   top: 0px;
//   right: 0px;
//   left: 0;
//   bottom: 0;
//   margin: auto;
//   border:none;
//  background-color: transparent;
//  // opacity:${props=>props.isPlaying?0:1};
//  transition: all 0.7s ease;
//   cursor: pointer;
//   z-index: 999;
 
// `
const Button=styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  border:none;
 background-color: transparent;
  opacity:1;
 transition: all 0.6s ease;
 z-index: 99;
  cursor: pointer;
 
  @media screen and (max-width:768px){
        opacity: 1;
    }
 
 
`

const Time=styled.p`
  font-size: 13px;
  font-family:'Poppins';
  color:#545252;
  color:${props=>props.darkMode && '#b5b5b5'}

`
const Caption=styled.div`
display: flex;
    gap: 5px;
    font-size: 16px;
    font-weight: 500;
    
   &>p{
    font-size: 14px;
    font-weight: 300;

    
   }
`

const Post=styled.div`
    display: flex;
    flex-direction: column;
    width: 55%;
    gap: 10px;
    padding-bottom: 10px;
    border-bottom: 0.8px solid #cac8cc;
    
    @media screen and (max-width:768px){
        width: 100%;
        
    }
`
const Top=styled.div`
    display: flex;
   justify-content: space-between;
   align-items: center;
   @media screen and (max-width:768px){
        padding: 0 15px;
        
    }
   &>*{
        cursor: pointer;
    }
`

const TopLeft=styled.span`
    display: flex;
    gap: 8px;
    align-items: center;
    padding-left: 8px;
    @media screen and (max-width:768px){
        padding: 0 ;
        
    }
   
`

const Center=styled.div`
    display: flex;
    position: relative;
   height: 70vh;
  align-items: flex-end;
   cursor: pointer;
   
   @media screen and (max-width:768px){
        height: 63vh;
      
    }
`

const Image=styled.img`
    width: 100%;
    height: 100%;
    border-radius: 2px;
`
const Video=styled.video`
    width: 100%;
    height: 100%;
    border-radius: 2px;
    object-fit: cover;
   
`



const Bottom=styled.div`
   display: flex;
   flex-direction: column;
   gap: 6px;
   font-size: 15px;
   @media screen and (max-width:768px){
        padding: 0 15px;
        gap: 4px;
    }
`
const BottomTop=styled.div`
    display: flex;
   justify-content: space-between;
   align-items: center;
`
const BottomTopLeft=styled.div`
    display: flex;
  gap: 18px;
   align-items: center;
   &>*{
        cursor: pointer;
    }
`
const Save=styled.img`
    cursor: pointer;
`


const CommentInput=styled.input`
  border: none;
  background-color:${props=>props.darkMode?'black':'white'};
  &:focus{
    outline: none;
  };
  @media screen and (max-width:768px){
       display: none;
    }
`