import { Avatar } from '@mui/material'
import {axiosInstance} from '../config'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { loginSuccess } from '../redux/userRedux'
import Navbar from './Navbar'
import SinglePost from './SinglePost'
import {handleProfile,updateProfile} from "../apiCalls"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import HomePost from './HomePost'
import CommentSection from './CommentSection'
import Hamburger from './Hamburger'
import './loader.css'
import Reel from './Reel'


    const Account = ({socket}) => {
    const screenWidth = window.innerWidth;
    const darkMode=useSelector(state=>state.darkMode)
    const [open,setOpen]=useState(false)
    const location = useLocation()
    const dispatch=useDispatch()
    const id = location.search.split('=')[1]
    const [profilePic,setProfilePic]=useState(null)
    const user = useSelector(state=>state.user.currentUser)
    const [posts,setPosts] = useState([])
    const [profile,setProfile] = useState({})
    const [followers,setFollowers]=useState([])
    const isFollowing=followers.find(like=>like===user._id)
    const [clicked,setClicked]=useState(false)
    const [fetch,setFetch]=useState(false)
    const [openComment, setOpenComment] = useState(false)
    const [mobilePosts,setMobilePosts]=useState([])
    const [index,setIndex]=useState(null)
    const [slice,setSlice]=useState(0)
    const [update,setUpdate]=useState(false)
    const [selected,setSelected]=useState('Posts')
    const [muted,setMuted]=useState(true)
    const [media,setMedia]=useState([])
    

    useEffect(()=>{
    
        if(selected==='Posts'){
           setPosts(media.filter(p=>!p.isReel))
        }else{
           setPosts(media.filter(p=>p.isReel))
        }
       },[media,selected])



useEffect(()=>{
    const slicedPosts=posts.slice(index,posts.length)
    open&& setMobilePosts(slicedPosts)
},[index])


useEffect(()=>{
    const getUser = async()=>{
        try{
            const res = await axiosInstance.get("/users/"+id , {headers:{token:"Bearer "+user.accessToken}})
            
            setProfile(res.data)
            setFollowers(res.data.followers)

        }catch(e){
            console.log(e)
        }
       
    }
    getUser()
},[id,user])


useEffect(()=>{
    const getPosts = async()=>{
        try{
            const res = await axiosInstance.get("/posts/userposts/"+profile._id, {headers:{token:"Bearer "+user.accessToken}} )
            
            setMedia(res.data)

        }catch(e){
            console.log(e)
        }
       
    }
    getPosts()
},[profile,user,fetch])





const handleFollow=async()=>{
    const message={userId:user._id,profileId:profile._id,text:`${user.username} started following you.`}
   isFollowing&& socket?.current?.emit('startedFollowing',  message )
    try{
        if(isFollowing){
       await axiosInstance.post('/noti/create', {notificationId:profile?._id,message}, {headers:{token: "Bearer "+user.accessToken}})
       
    }
   
       const res= await axiosInstance.put("/users/follow/"+profile._id, {userId:user._id}, {headers:{token: "Bearer "+user.accessToken}})
       setClicked(false)
       dispatch(loginSuccess(res.data))
      
    }catch(e){
        console.log('')
    }
 
}

useEffect(()=>{
    clicked&&handleFollow()
},[clicked])

useEffect(()=>{
    const handleUpdate=()=>{
    
        const details={}
        handleProfile(profilePic,updateProfile,user._id,details,user.accessToken,dispatch,loginSuccess)
        
    }
    update && handleUpdate()
},[update])




  return (
    <Flex>
        
        <SinglePost open={open} socket={socket} setIndex={setIndex} index={index} length={posts.length}
        setOpen={setOpen}  selected={posts[index]} fetch={fetch} setFetch={setFetch} />
       
    <Navbar socket={socket} id={id}/>
    <Container darkMode={darkMode} >

        {screenWidth<768 &&   <Hamburger/> }
   
        <Center open={open}>
<Top>
 <Profile> 
{
    screenWidth>768? <Avatar src={profilePic?URL.createObjectURL(profilePic):profile.profilePic} sx={{width:"8vw",height:"8vw"}}/>
    : <Avatar src={profilePic?URL.createObjectURL(profilePic):profile.profilePic} sx={{width:"20vw",height:"20vw"}}/>
}
      

 <span>{profile.name}</span>
 </Profile>
    <TopRight>
      
        <Info>
            <Child><Span darkMode={darkMode}>{selected}</Span>
        <p>{posts.length}</p>
            </Child>
            <Child onClick={()=>setOpen(true)}><Span darkMode={darkMode}>Followers</Span>
            <p>{followers.length}</p>
          
            </Child>
            <Child>
                <Span  darkMode={darkMode} >Following</Span>
                <p>{profile.following?.length}</p>
            </Child>
           
        </Info>
        <User>
            <span>{profile.username}</span>
            {user._id!==profile._id&& 

     <Button 
     onClick={()=>{setClicked(true);isFollowing?setFollowers(followers.filter(f=>f!==user?._id)):setFollowers(f=>[...f,user?._id])}}
      color="white" bg="#0095f6" >
              
                {isFollowing?"Unfollow":"Follow"}
                </Button>}  


            {user._id===profile._id&& 
                   <>  <Button file={profilePic} >
                <Label file={profilePic} htmlFor="img">Edit</Label>
                <input id="img" type="file" onChange={(e)=>setProfilePic(e.target.files[0])}/>
              {profilePic&& <span onClick={()=>setUpdate(true)} >{update ? <div className='loader'></div> : 'Update' }</span>}  
                </Button> 
               
                </>}  
         
           
        </User>
        
      
    </TopRight>
</Top>

<Bottom>
    <BottomTop>
        <Child selected={selected==='Posts'} onClick={()=>{setSelected('Posts');setIndex(null);setMuted(true)}}>
            <div>Posts</div>
        </Child>

        <Child selected={selected==='Reels'} onClick={()=>{setSelected('Reels');setIndex(null)}}>
            <div>Reels</div>
        </Child>
        

    </BottomTop>


    <Data>
       {posts.map((item,i)=>(
        
            selected==='Posts'? < Post key={i} onClick={()=>{setIndex(i);setOpen(true)}} src={item.image}/> 
            : < Video key={i} onClick={()=>{setIndex(i);setOpen(true)}} src={item.video}/>
        
       
       ))}
    </Data>

 

</Bottom>
</Center>

{open && 
    <MobileFeed open={open}>
            <Back reels={selected==='Reels'} darkMode={darkMode}>
   <KeyboardBackspaceIcon htmlColor={selected==='Reels'&&'white'} fontSize="large" onClick={()=>{setOpen(false)}}/>
            </Back>


        <CommentSection  setOpenComment={setOpenComment} fetch={fetch} setFetch={setFetch}
          openComment={openComment} selected={mobilePosts[slice]}/>
          
                    {selected==='Posts'?mobilePosts.map((item,i)=>(
                       
                        <HomePost key={i} setFetch={setFetch} fetch={fetch} socket={socket} index={i} setIndex={setSlice}
                        item={item}    setOpen={setOpen}  setOpenComment={setOpenComment} /> 
                         
                    )):
                    <Feed id='yourRootElement'>
                        {mobilePosts.map((item,i)=>(
                              <Reel key={i} setFetch={setFetch} fetch={fetch} socket={socket} 
                              setMuted={setMuted}  muted={muted}
                                setIndex={setSlice} index={i} id='yourRootElement'
                               item={item}  setOpen={setOpen}  setOpenComment={setOpenComment} />
                        ))}
                    </Feed>
                    }
              
                </MobileFeed>
}


    </Container>
        
    </Flex>
  )
}

export default Account

const Feed=styled.div`
    width: 30vw;
   height: 85vh;
   overflow-y: auto;
display: none;
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
       display: flex;
  
       
    
    };
`
const Video=styled.video`
   width: calc((100% - 10px) / 3);
height: 31vh;
object-fit: cover;
cursor: pointer;
@media screen and (max-width:768px){
       height: 14.5vh;
       width: calc((100% - 6px) / 3);
    }  
`

const Flex=styled.div`
    display:flex;
    width:100vw;
    justify-content:space-between
`
const Back=styled.div`
    height: 5vh;
    background-color: white;
    background-color: ${props=>props.darkMode&&'black'};
    color: ${props=>props.darkMode&&'white'};
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100vw;
    display: flex;
    align-items: center;
    padding-left: 12px;
    background-color: ${props=>props.reels&& 'transparent'};
   
`

const Container=styled.div`
    width: 84vw;
    display: flex;
    justify-content: center;
    background-color: ${props=>props.darkMode&&'black'};

    @media screen and (max-width:768px){
     width: 100vw;
     min-height: 100vh;
    }
`

const Center=styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    padding-top: 32px;
    gap: 35px;
    @media screen and (max-width:768px){
        width: 100vw;
        display: ${props=>props.open&&"none"};
    }
`
const Top=styled.div`
   
    display: flex;
   align-items: center;
    padding-left: 6vw;
    gap: 8vw;
    @media screen and (max-width:768px){
        align-items: center;
        margin-top: 20px;
    }
`

const Profile=styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
&>span{
    align-self: center;
}
@media screen and (max-width:768px){
    &>span{
   font-size: 14px;
}
    }
`

const TopRight=styled.div`
     display: flex;
     flex-direction: column;
     gap: 25px;
`
const User=styled.div`
display: flex;
   align-items: center; 
    gap:20px;
@media screen and (max-width:768px){      
      font-size: 14px;
    }
 
`

const Info=styled.div`
   align-items: center;
    display: flex;
    @media screen and (max-width:768px){
      
      font-size: 14px;
    }
    gap: 4vw;
`

const MobileFeed=styled.div`
    padding: 0;
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 66%;
    
    @media screen and (max-width:768px){
       width: 100%;
       padding: 0 0 7vh 0;
       display: ${props=>props.open&&"flex"};
    };

  
`

const Child=styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 3px;
color: ${props=>props.selected && '#0095f6'};
font-weight: ${props=>props.selected && 500};
border-bottom: ${props=>props.selected && '0.7px solid #5e5e5f'};
`

const Span=styled.span`
font-weight: 500;
    color: #292929;
    color:${props=>props.darkMode&&'#cbcacc'};
`
const Bottom=styled.div`
    display: flex;
    flex-direction: column;
    gap: 38px;
    padding: 15px;
    border-top: 0.5px solid #e0e0e3;
    align-items: center;
    @media screen and (max-width:768px){
       padding: 15px 0;
    }
`

const BottomTop=styled.div`
    display: flex;
    align-items: center;
    gap: 60px;
    &>*{
        cursor: pointer;
    }
`
const Data=styled.div`
    display: flex;
    flex-wrap:wrap;
    width: 90%;
    gap: 5px;
    @media screen and (max-width:768px){
       width: 100%;
       gap: 3px;
    }
`

const Post=styled.img`
width: calc((100% - 10px) / 3);
height: 31vh;
cursor: pointer;
@media screen and (max-width:768px){
       height: 14.5vh;
       width: calc((100% - 6px) / 3);
    }  
`


const Button=styled.button`
border: none;
padding:5px 15px;
padding:${props=>props.file&&0};
display: flex;
border-radius: 4px;
cursor: pointer;
font-size: 16px;
background-color: #ebe6e6;
background-color:${props=>props.bg};
color:${props=>props.color};
&>span{
    cursor: pointer;
    background-color: #0095f6;
    color:white;
    padding:5px 15px;
}
;
&>input{
    display: none;
};
@media screen and (max-width:768px){
      
      font-size: 14px;
    }
`

const Label=styled.label`
display: ${props=>props.file&&"none"};
cursor: pointer;
`

