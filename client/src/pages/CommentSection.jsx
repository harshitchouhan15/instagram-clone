import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import styled from 'styled-components'
import { Avatar } from "@mui/material"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {axiosInstance} from '../config'
import { Link } from 'react-router-dom';

const CommentSection = ({openComment,selected,setFetch,fetch, setOpenComment,socket}) => {
const darkMode=useSelector(state=>state.darkMode)
const user=useSelector(state=>state.user.currentUser)
 const [comments,setComments]=useState(selected?.comments)
 const [clicked,setClicked]=useState(false)
 const [comment, setComment] = useState("")

 const details=  {
    userId:user._id,
     username:user.username,
     profilePic:user.profilePic,
      comment:comment
    }

    const handleComment= async(post)=>{
        const  message={profileId:post.postId,postId:post._id,text:`${user.username} commented on your post`}
          try{
             const res= await axiosInstance.put("/posts/"+post._id+"/comment", {userId:user._id,
               username:user.username,profilePic:user.profilePic, comment:comment},
               {headers:{ token: "Bearer "+user.accessToken}})
      if(post.postId!==user?._id)
               {  socket?.current?.emit('postCommented', message)
                 await axiosInstance.post('/noti/create',{notificationId:post.postId,message}, {headers:{ token: "Bearer "+user.accessToken}})}
      
               setFetch(!fetch)
               
               setComment("")
             
          }catch(e){
              console.log(e)
          }
      }

 useEffect(()=>{
  setComments(selected?.comments)
 },[selected])

 useEffect(()=>{
  clicked && handleComment(selected)
 },[clicked])

  return (
    <Container darkMode={darkMode} open={openComment}> 
     <Back darkMode={darkMode}>
    <KeyboardBackspaceIcon fontSize="medium" onClick={()=>{setOpenComment(false)}}/>
    <h3>Comments</h3>
    </Back>
            <Caption>
            <Link to={`/account/?user=${selected?.postId}`} className={darkMode?'darkModeLink':"link"}> 
             <Avatar src={selected?.profilePic}/>   </Link> 
             <Link to={`/account/?user=${selected?.postId}`} className={darkMode?'darkModeLink':"link"}> 
                <span>{selected?.username}</span> </Link>
                <p>{selected?.caption}</p>
            </Caption>

<Section>
{comments?.map((c,e)=>(
 <Comment key={e}>
<Link to={`/account/?user=${c.userId}`} className={darkMode?'darkModeLink':"link"}> 
             <Avatar src={c.profilePic}/>   </Link> 
             <Link to={`/account/?user=${c.userId}`} className={darkMode?'darkModeLink':"link"}> 
                 <span>{c.username}</span></Link>
 <p>{c.comment}</p>
 </Comment>
)).reverse()}
 </Section>           
            <CommentBox darkMode={darkMode}>
                <input  className={darkMode&&'darkModeLink'} value={comment} onChange={(e)=>setComment(e.target.value)} placeholder='Add comment'/>
                <Button disabled={comment===''} onClick={()=>{setComments(c=>[...c,details]);setClicked(true)}}> Post</Button>
            </CommentBox>
            </Container>
  )
}

export default CommentSection

const Container=styled.div`
       height: 100vh;
    background-color: white;
    position: fixed;
    bottom: 0;
    background-color: ${props=>props.darkMode&&'black'};
    
    z-index: 1000;
    gap: 15px;
    box-shadow: 2px 2px 3px 2px #d4d4d5;
    width: 100vw;
    display: none;
    flex-direction: column;
    @media screen and (max-width:768px){
        
        display: ${props=>props.open?"flex":"none"};
    };
    &>*{
        padding: 0 12px;
    };
   
`
const Back=styled.span`
 font-size: 18px;
        font-weight: 400;
        background-color:#ffffff;
        background-color: ${props=>props.darkMode&&'black'};
        color: ${props=>props.darkMode&&'white'};
        position: sticky;
        display: flex;
        align-items: center;
        padding-left: 10px;
        top: 0;
        z-index: 9999;
        gap: 12px;
        padding: 15px 12px;
        border-bottom: 0.5px solid #bcbbbd;
`

const Section=styled.div`
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
    height: 78vh;
    

`

const Caption=styled.div`
    display: flex;
    gap: 8px;
    font-size: 15px;
    font-weight: 400;
    border-bottom: 0.5px solid #ededed;
    padding-bottom: 5px;
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

const CommentBox=styled.div`
    display: flex;
    align-items: center;
  z-index: 9999;
  position: fixed;
  height: 6vh;
 background-color: white;
 background-color: ${props=>props.darkMode&&'black'};
 color: ${props=>props.darkMode&&'#e7e6e9'};
  bottom: 0;
  width: 100vw;
    justify-content: space-between;
border-top: 0.5px solid #8f8f92;
&>input{
    border:none;
    background-color: transparent;
    width:90%;
 
    &:focus{
    outline:none
    }

}
`



const Button=styled.button`
    color: #4242f6;
cursor: pointer;
border:none;
background-color: transparent;
&:disabled{
    color:#515152
}

`
