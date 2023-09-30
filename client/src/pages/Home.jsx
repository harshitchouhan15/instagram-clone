import black from "../assets/black.svg"
import whiteLike from "../assets/whiteLike.svg"
import styled from 'styled-components'
import photo1 from "../assets/asset 12.svg"
import { Link } from 'react-router-dom'
import whiteMessage from "../assets/whiteMessage.svg"
import SinglePost from './SinglePost'
import { useState,useEffect } from 'react'
import {axiosInstance} from '../config'
import {useSelector} from "react-redux"
import Navbar from './Navbar'
import photo6 from "../assets/asset 17.svg"
import photo7 from "../assets/asset 18.svg"
import CommentSection from "./CommentSection"
import HomePost from './HomePost';
import { Badge } from '@mui/material'
import Notification from "./Notification"
import HomeRight from "./HomeRight"


const Home = ({socket}) => {
    const user = useSelector(state=>state.user.currentUser)
    const [posts,setPosts] = useState([])
    const [open,setOpen]=useState(false)
    const [fetch,setFetch]=useState(false)
    const [index,setIndex]=useState(0)
    const [openComment, setOpenComment] = useState(false)
    const darkMode=useSelector(state=>state.darkMode)
    const [noti,setNoti]= useState(false)
   const [muted,setMuted] = useState(true)
   const [random,setRandom] = useState([])
    const [notifications,setNotifications] = useState([])

    useEffect(()=>{
        const getNoti = async()=>{
          const res = await axiosInstance.get('/noti/get/'+user?._id, {headers:{token:'Bearer '+user?.accessToken}})
          setNotifications(res.data)
        }
        getNoti()
      },[user])


    useEffect(()=>{
        const getPosts = async()=>{
            const res= await axiosInstance.get("/posts/timeline/"+ user?._id, {headers:{token: "Bearer "+user?.accessToken}})
            const onlyPosts=res.data
            const array =  onlyPosts.sort((a, b) => {
                
                return new Date(b.createdAt) - new Date(a.createdAt)
              });
            setPosts(array)
             
        }
        getPosts()
    },[fetch])

    useEffect(()=>{
      const getPosts = async()=>{
          const res= await axiosInstance.get("/posts/random/posts", {headers:{token: "Bearer "+user?.accessToken}})
          const onlyPosts=res.data
          const array =  onlyPosts.sort((a, b) => {
              
              return new Date(b.createdAt) - new Date(a.createdAt)
            });
          setRandom(array)
           
      }
      getPosts()
  },[fetch])

   


  return (

    <Flex>


{posts.length>0 && <SinglePost open={open} socket={socket} setIndex={setIndex}
 index={index} length={posts.length} setOpen={setOpen} selected={posts[index]} fetch={fetch} setFetch={setFetch} />}

        <Navbar socket={socket}  />

 <Container>
 <CommentSection  fetch={fetch} setFetch={setFetch} setOpenComment={setOpenComment} socket={socket} 
         openComment={openComment} selected={posts[index]}/>
                <Feed>
                    {posts.length!==0?posts.map((item,i)=>(
                        <HomePost key={i} setFetch={setFetch} fetch={fetch} socket={socket} 
                          setIndex={setIndex} index={i} setMuted={setMuted} muted={muted}
                         item={item}  setOpen={setOpen}  setOpenComment={setOpenComment} />
                    ))
                  : random.map((item,i)=>(
                    <HomePost key={i} setFetch={setFetch} fetch={fetch} socket={socket} 
                    setIndex={setIndex} index={i} setMuted={setMuted} muted={muted}
                   item={item}  setOpen={setOpen}  setOpenComment={setOpenComment} />
                    
                  )) 
                  }
              
                </Feed>

                <HomeRight socket={socket} />
 </Container>

 <Topbar darkMode={darkMode}>
   
   <img src={darkMode?photo1:black} alt="" />

 <TopRight>
      <Badge  badgeContent={notifications.length} color="primary" >
          <    img src={darkMode?whiteLike:photo7} onClick={()=>setNoti(!noti)} />
     </Badge>
   <StyledLink to="/direct-inbox"> <img src={darkMode?whiteMessage:photo6}/></StyledLink>
   </TopRight>

   <Notification  noti={noti} setNotifications={setNotifications}   notifications={notifications}  setNoti={setNoti}/>
</Topbar> 
 </Flex>
  )
}

export default Home



export const  Flex=styled.div`
display: flex;width: 100vw;
justify-content: space-between;
height: max-content;
`

const Container=styled.div`
   
    width: 84vw;
    
    display: flex;
  
    position: relative;

    @media screen and (max-width:768px){
      width: 100vw;
    }
   
`

const Feed=styled.div`
padding: 0px 0 0px 4vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 66%;
    
    height: 100vh;
    overflow-y: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar{
      display: none;
    };
    @media screen and (max-width:768px){
       width: 100%;
       padding: 0 0 7.5vh 0;
       &>:first-child{
        margin-top: 7vh;
    }
    };

    &>:first-child{
        margin-top: 8vh;
    };
    &>:last-child{
        margin-bottom: 30px;
    }

`



const Topbar=styled.div`
     display: none;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
    position: fixed;
    height: 7vh;
    width: 100vw;
    color: ${props=>props.darkMode&&'white'};
    top: 0;
    background-color: white;
    background-color: ${props=>props.darkMode&&'black'};
    z-index: 1;
    @media screen and (max-width:768px){
        display: flex;
    }
`

const StyledLink=styled(Link)`
    text-decoration: none;
    color: #494747;
`



const TopRight=styled.div`
    display: flex;
   gap: 10px;
    align-items: center;
  
`


