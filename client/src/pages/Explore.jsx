import React from 'react'
import styled from 'styled-components'
import {  useSelector} from "react-redux"
import { Avatar } from "@mui/material"
import { Link } from "react-router-dom"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {axiosInstance} from '../config'
import { useState,useEffect } from 'react'
import {Flex} from "./Home"
import Navbar from './Navbar'
import SinglePost from "./SinglePost"
import CloseIcon from '@mui/icons-material/Close';
import CommentSection from "./CommentSection"
import HomePost from './HomePost'

const Explore = ({socket}) => {
    const [open,setOpen]=useState(false)
    const [fetch,setFetch]=useState(false)
    const [posts,setPosts] = useState([])
    const [mobilePosts,setMobilePosts] = useState([])
    const [slice,setSlice]=useState(0)
    const [index,setIndex]=useState(null)
    const [users,setUsers]=useState([])
    const [query,setQuery]=useState('')
    const darkMode=useSelector(state=>state.darkMode)
    const user=useSelector(state=>state.user.currentUser)
    const [result,setResult]=useState(false)
  
    const [openComment, setOpenComment] = useState(false)

    useEffect(()=>{
        const getUsers=async()=>{
            const res= await axiosInstance.get("/users/all/users", {headers:{token:"Bearer "+user?.accessToken}})
            setUsers(res.data)
           
        }
        getUsers()
        
    },[])

    useEffect(()=>{
        const getPosts = async()=>{
            try{
                const res= await axiosInstance.get("/posts/all/posts")        
                    setPosts(res.data)                     
            }
           catch(e){
            console.log(e)
           }         
        }
        getPosts()
    },[fetch])

useEffect(()=>{
    const slicedPosts=posts.slice(index,posts.length)
   open&& setMobilePosts(slicedPosts)
},[index,posts])



  

  return (

    <Flex>

        <SinglePost open={open} socket={socket} setIndex={setIndex} index={index} length={posts.length}
        setOpen={setOpen}  selected={posts[index]} fetch={fetch} setFetch={setFetch} />


<Navbar socket={socket}/>
 
    <Container>
        <Search darkMode={darkMode} open={open}>
      
        <Input  onClick={()=>setResult(true)} value={query} onChange={(e)=>setQuery(e.target.value.toLowerCase())} placeholder='Search'/>
        <CloseIcon onClick={()=>{setResult(false);setQuery('')}}/>
        </Search>
        <Result darkMode={darkMode} result={result}>
        {users.filter(u=>u.username.includes(query|| u.name.toLowerCase().includes(query))).map(
        (user,i)=>(
            <Link className={darkMode?'darkModeLink':"link"} key={i} to={`/account/?user=${user._id}`} >
             <User >
               
              <span> <Avatar src={user.profilePic}/>
            <span>{user.username}</span>
            </span> 
        
        </User></Link>
        )
    )}

        </Result>


        <MobileFeed open={open}>
            <Back darkMode={darkMode}>
               <KeyboardBackspaceIcon fontSize="large" onClick={()=>setOpen(false)}/>
            </Back>


        <CommentSection  setOpenComment={setOpenComment} fetch={fetch} setFetch={setFetch}
          openComment={openComment} selected={mobilePosts[slice]}/>
          
                    {mobilePosts.map((item,i)=>(
                         <HomePost key={i} setFetch={setFetch} fetch={fetch} socket={socket} index={i} setIndex={setSlice}
                         item={item}    setOpen={setOpen}  setOpenComment={setOpenComment} />
                    ))}
              
                </MobileFeed>


        <Feed open={open}>
            {posts.map((item,i)=>(
                <Post onClick={()=>{setOpen(true);setIndex(i)}} key={i}>
                  {
                    item.isReel? <Video  src={item.video}/> 
                    : <Image src={item.image}/>
                  }  
                    
                   
                </Post>
            ))}

        </Feed>
    </Container>
    </Flex>
  )
}

export default Explore

const Container=styled.div`
    width: 84vw;
    display: flex;
   
    flex-direction: column;
    @media screen and (max-width:768px){
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    }
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
`

const Search=styled.div`
    display: none;
    align-items: center;
    height: 5vh;
    padding: 5px 10px;
    border-radius:8px;
    background-color: #ececec;
    background-color: ${props=>props.darkMode&&'#f9f8fb'};
    color: ${props=>props.darkMode&&'black'};
    width: 95vw;
    justify-content: space-between;
    margin: 5px auto;
    @media screen and (max-width:768px){
        display: flex;
        display: ${props=>props.open&&"none"};
    }
`

const Result=styled.div` 
    width: 100vw;
    height: 94vh;
    overflow-y: auto;
   flex-direction: column;
   display: none;
 padding-top: 20px;
   position: fixed;
   top: 6vh;
    gap: 20px;
 z-index: 1000;
   background-color: white;
   background-color: ${props=>props.darkMode&&'black'};
  color: ${props=>props.darkMode&&'#f9f8fb'};
   @media screen and (max-width:768px){
    display: ${props=>props.result&&"flex"};
    };
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
       padding: 5vh 0 7vh 0;
       display: ${props=>props.open&&"flex"};
    };

  
`



const User=styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.4s ease;
    cursor: pointer;
    margin-bottom: 10px;
    padding-left: 20px;
    &:hover{
        background-color: #eeeded;
        
        border-radius: 5px;
        &>button{
            color: #434343;
    }
    };
    &>span{
        display: flex;
  gap: 8px;
    align-items: center;
    }
`

const Input=styled.input`
    border: none;
    background-color: transparent;
    flex: 9;
    &:focus{
        outline: none;
    }
`

const Feed=styled.div`
    width: 58.8vw;
    margin-inline: auto;
    margin-top: 25px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 19.6vw;
    grid-column-gap: 3px;
    grid-row-gap: 3px;
margin-bottom: 30px;
    @media screen and (max-width:768px){
       width: 100%;
       margin-top: 7px;
       margin-bottom: 7vh;
       grid-auto-rows: 33.3vw;
       display: ${props=>props.open&&"none"};

    };
    &>:nth-child(10n-7){
        grid-row: span 2;
    };
    &>:nth-child(10n-4){
        grid-row: span 2;
    }

`

const Post=styled.div`
   justify-content: center;
    display: flex;
   position: relative;
   color: white;
   cursor: pointer;
    gap: 20px;
    transition: all 0.5s ease;
   align-items: center;
   background-color: black;
   @media screen and (max-width:768px){
        
    };
    &:hover{
        
   &>span{
    opacity: 1;
   }
        &>img{
            opacity: 0.8;
        }
    }
    
    
`

const Image=styled.img`
    width: 100%;
    height: 100%;
    
    opacity: 1;
    
`
const Video=styled.video`
    width: 100%;
    height: 100%;
    
    opacity: 1;
    
`

