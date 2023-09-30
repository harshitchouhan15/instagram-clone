import {Avatar, Modal} from "@mui/material"
import styled from 'styled-components'
import { Link } from "react-router-dom"
import photo2 from "../assets/asset 22.svg"
import photo4 from "../assets/asset 26.svg"
import photo5 from "../assets/asset 28.svg"
import photo6 from "../assets/asset 29.svg"
import {axiosInstance} from '../config'
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useSelector} from "react-redux"
import {useState} from "react"
import { useEffect } from "react"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import whiteComment from '../assets/whiteComment.svg'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import whiteSave from "../assets/whiteSave.svg"
import whiteSend from "../assets/whiteSend.svg"
import { format } from 'timeago.js';

const SinglePost = ({open,setOpen,selected,setFetch,fetch,socket,setIndex,length,index}) => {
const user=useSelector(state=>state.user.currentUser)
const [comment,setComment]=useState("")
const darkMode=useSelector(state=>state.darkMode)
const [post,setPost]=useState({})
const screenWidth = window.innerWidth;
const [likes,setLikes]=useState([])
const [clicked,setClicked]=useState(false)
const isLiked=likes?.find(like=>like===user._id)

useEffect(()=>{
    open?setPost(selected):setPost({})
   open? setLikes(selected?.likes) : setLikes([])
},[selected,open])

    const likePost=async()=>{
      const  message={profileId:post.postId,postId:post._id,text:`${user.username} liked your ${post.isReel?'reel':'post'}.`}
        try{
           const res= await axiosInstance.put("/posts/like/"+post._id, {userId:user._id}, {headers:{ token: "Bearer "+user.accessToken}})
          if(isLiked&& post.postId!==user?._id){  socket?.current?.emit('postLiked',  message ) 
        await axiosInstance.post('/noti/create',{notificationId:post.postId,message}, {headers:{ token: "Bearer "+user.accessToken}})
        }
         setFetch(!fetch)
         
         setClicked(false)
        }catch(e){
            console.log('')
        }
    }


 const commentOnPost= async()=>{
  const  message={profileId:post.postId?post.postId:post.reelId,postId:post._id,text:`${user.username} commented on your ${!post.isReel?`post`:`reel`}.`}
    try{
       const res= await axiosInstance.put('/posts/'+post._id+"/comment", {userId:user._id,
         username:user.username,profilePic:user.profilePic, comment},
         {headers:{ token: "Bearer "+user.accessToken}})
         if(post.postId!==user?._id){
            socket?.current?.emit('postCommented', message)
            await axiosInstance.post('/noti/create',{notificationId:post.postId,message}, {headers:{ token: "Bearer "+user.accessToken}})
         }
       

         setFetch(!fetch)
         setPost(res.data)
         setComment("")
       
    }catch(e){
        console.log(e)
    }
}

useEffect(()=>{
   clicked && likePost()
    
},[clicked])

  return (

   screenWidth>768&& <MyModal open={open} onBackdropClick={()=>{setOpen(false)}}>
  <>

      <Arrow darkMode={darkMode}>  <ChevronRightIcon onClick={()=>{index<length-1?setIndex(index+1):setIndex(length-1)}}  fontSize="inherit" className="right" /></Arrow> 
        <Arrow darkMode={darkMode}> <ChevronLeftIcon  onClick={()=>{index>0?setIndex(index-1):setIndex(0)}} fontSize='inherit' className='left' /> </Arrow>
    <Container>



        {post?.image?   <Image src={post.image} /> :  <Video autoPlay loop src={post?.video} />}
       

        <Right darkMode={darkMode} >
       
            <User>
            <Link to={`/account/?user=${post?.postId}`} className={darkMode?'darkModeLink':"link"}>
            <UserInfo darkMode={darkMode}>
                    <Avatar src={post?.profilePic}/>
                    <span>{post?.username}</span>
                </UserInfo>
                </Link>   
                <img src={photo2} alt="" />
            </User>

            <Caption>
            <Link to={`/account/?user=${post?.postId}`} className={darkMode?'darkModeLink':"link"}> 
             <Avatar src={post?.profilePic}/>   </Link> 
             <Link to={`/account/?user=${post?.postId}`} className={darkMode?'darkModeLink':"link"}> 
                 <span>{post?.username}</span></Link>
              <p>{post?.caption}</p>
            </Caption>

<Section>
{post?.comments?.map((i,e)=>(
 <Comment key={e}>
<Link to={`/account/?user=${i.userId}`} className={darkMode?'darkModeLink':"link"}> 
             <Avatar src={i.profilePic}/>   </Link> 
             <Link to={`/account/?user=${i.userId}`} className={darkMode?'darkModeLink':"link"}> 
                 <span>{i.username}</span></Link>
 <p>{i.comment}</p>
 </Comment>
)).reverse()}
</Section>


       

        <Bottom >
            <Top>
                <Options>
                     {
                isLiked  ?     <  FavoriteIcon htmlColor="crimson" onClick={()=>{setLikes(likes.filter(l=>l!==user?._id));setClicked(true)}} />  
                    : <  FavoriteBorderIcon  onClick={()=>{setLikes(n=>[...n,user?._id]);setClicked(true)}} />  
                    }
                   
                 
                    <img  src={darkMode?whiteComment:photo4} alt="" /> 
 
                    <img src={darkMode?whiteSend:photo5} alt="" />
                   
                </Options>
                <img src={darkMode?whiteSave:photo6} alt="" />
            </Top>

            <Center>
          <span>{likes?.length} likes</span>
          <Time darkMode={darkMode}>{format(post?.createdAt)}</Time>
          
            </Center>

            <CommentBox>
                <Input darkMode={darkMode} placeholder="Add a comment" value={comment} onChange={(e)=>setComment(e.target.value)} />
                <Button disabled={comment===''} onClick={commentOnPost} >Post</Button>
            </CommentBox>
        </Bottom>
         

        </Right>
    </Container>
    </>
    </MyModal>
  )
}

export default SinglePost

const Time=styled.p`
  font-size: 14px;
  font-family:'Poppins';
  color:#545252;
  color:${props=>props.darkMode && '#bebdbd'}

`

const Arrow=styled.div`
    font-size: 80px;
    color: ${props=>props.darkMode&&'white'};
`


const Container=styled.div`
    display: flex;
    position: fixed;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
   
    width: 60vw;
    height: 92vh;
background-color: white;
background-color: ${props=>props.darkMode&&'black'};
outline: none;
border-top-right-radius: 5px;
border-bottom-right-radius:5px;
@media screen and (max-width:768px){
    display: none;
    };
`

const MyModal=styled(Modal)`
@media screen and (max-width:768px){
    display: none;
    };
`

const Image=styled.img`
    width: 50%;

`
    const Video=styled.video`
    width: 50%;
    height: 100%;
    object-fit: fill;

`


const Right=styled.div`
    display: flex;
    flex-direction: column;
    color: ${props=>props.darkMode&&'white'};
    height: 100%;
    background-color: ${props=>props.darkMode&&'black'};
    width: 50%;
   position: relative;
    border-left: 1px solid #adadaf;
    border-left: ${props=>props.darkMode&&'none'};
    &>*{
        padding:  7px 10px;
    }
`
const Section=styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    height: 56.2vh;
    scrollbar-width: none;
  
    &::-webkit-scrollbar{
        display: none;
    }
`

const User=styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  

   position: sticky;
   top: 0;
   z-index: 999;
   margin-bottom: 10px;
   border-bottom: 1px solid #b9b8bb;
`

const UserInfo=styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    cursor: pointer;
`

const Caption=styled.div`
    display: flex;
    gap: 8px;
    font-size: 15px;
    font-weight: 400;
    &span{
        cursor:pointer
    }
   &>p{
    font-size: 14px;
    font-weight: 300;
   }
    
`

const Comment=styled.div`
       display: flex;
    gap: 8px;
    font-size: 15px;
    font-weight: 400;
    &span{
        cursor:pointer
    }
   &>p{
    font-size: 14px;
    font-weight: 300;
   }
    
`

const Bottom=styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    width: 100%;
    gap: 10px;
    border-top: 0.7px solid #d3d3d4;
    z-index: 999;
   
    padding-bottom: 5px;
height: 20vh;

`
const Top=styled.div`
    display: flex;
   justify-content: space-between;
    
`

const Options=styled.div`
    display: flex;
   align-items: center;
   gap: 10px;
   &>*{
    cursor: pointer;

   }
    
`
const Center=styled.div`
    display: flex;
    flex-direction: column;
   
    
`
const CommentBox=styled.div`
    display: flex;
    align-items: center;
  
    justify-content: space-between;
border-top: 0.5px solid #e2e2e3;
padding: 10px 0 5px 0;
`

const Input=styled.input`
    width: 90%;
    background-color: transparent;
    border: none;
    font-size: 15px;
   color: ${props=>props.darkMode&&'white'};
    &:focus{
        outline: none;
    }
`

const Button=styled.button`
    color: #1c1cfa;
    border:none;
    background-color: transparent;
cursor: pointer;
font-size: 16px;
&:disabled{
    color:#515152
}

`
