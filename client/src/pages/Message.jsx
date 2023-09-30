import { Avatar, Button,  } from '@mui/material'
import {axiosInstance} from '../config'
import { format } from 'timeago.js';
import SendIcon from '@mui/icons-material/Send';
import React, { useRef } from 'react'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import {Flex} from "./Home"
import Navbar from './Navbar'
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ChatSearch from './ChatSearch';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Message = ({socket}) => {
const [show,setShow]= useState(true)
const user=useSelector(state=>state.user.currentUser)
const [newChat,setNewChat] = useState(null)
const [arrivalMessage,setArrivalMessage]=useState(null)
const [text,setText]=useState("")
const [showChat,setShowChat] = useState(false)
const darkMode=useSelector(state=>state.darkMode)
const scrollRef=useRef()
const [send,setSend]=useState(false)
const [chats,setChats]=useState([])
const [allChatMessages,setAllChatMessages] =useState([])
const [index,setIndex] = useState(0)
const [selected,setSelected]=useState(null)


useEffect(()=>{
    
    socket?.current?.on("sendMessage", (m)=>{
       
        setArrivalMessage({
            text:m.text,
            senderId:m.senderId,
            createdAt:Date.now()
        })
    })
  },[])

  

useEffect(()=>{
    const selectedChat=allChatMessages[index]
    selectedChat?.push(arrivalMessage)
    const copiedMessages = allChatMessages.slice()
    copiedMessages[index]=selectedChat
    arrivalMessage && selected?.members?.filter(m=>m!==user?._id)[0]===arrivalMessage?.senderId && 
    setAllChatMessages(copiedMessages)
},[arrivalMessage])

useEffect(()=>{
    if(!newChat){

        const getMessages=async()=>{
            let allChatMessages=[]
            for(let i=0;i<chats.length;i++){
                const messages = await axiosInstance.get("/messages/get/"+chats[i]._id, {headers: {token:"Bearer "+user?.accessToken}}  )
                if(messages.data===null){
                    allChatMessages.push([])
        
                }else{
                    allChatMessages.push(messages.data)
        
                }
            }
            setAllChatMessages(allChatMessages)
          }
          getMessages()
        }
    
 
},[chats])

useEffect(()=>{
    const getAllChats = async()=>{
        const res= await axiosInstance.get('/chats/get/'+user?._id,  {headers: {token:"Bearer "+user?.accessToken}})
       setChats(res.data)
       
    }
    getAllChats()
},[user])

const handleDelete = async()=>{
    try{
        await axiosInstance.delete('/chats/delete/'+selected?._id, {headers:{token : "Bearer "+user?.accessToken}} )
        window.location.reload()
    }catch(e){
        console.error(e)
    }
}

useEffect(()=>{
  scrollRef.current?.scrollIntoView({behavior : "smooth"})
},[allChatMessages])




    useEffect(()=>{
        const updateChat=async()=>{   
            try{
                 await axiosInstance.post ("/messages/send", allChatMessages[index][allChatMessages[index].length-1] ,
                  {headers: {token:"Bearer "+user?.accessToken}} )  
                 setSend(false)  
            }catch(e){
            console.log(e)
        }
        }
        
  send && updateChat()
},[allChatMessages,send])

const newMessage=(e)=>{
    e.preventDefault()
    const details={
      conversationId:selected?._id,
      senderId:user?._id,
      text:text,
    }
    socket?.current?.emit("getMessage", {
        senderId:user._id,
        recieverId:selected?.members?.filter(m=>m!==user?._id)[0],
        text:text
      })
    const selectedChat=allChatMessages[index]
    selectedChat?.push(details)
    const copiedMessages = allChatMessages.slice()
    copiedMessages[index]=selectedChat
    setText("")
   newChat && setNewChat(null)
    setAllChatMessages(copiedMessages)
    setSend(true)
}



  return (

    <Flex>
        <Navbar socket={socket}/>

        <ChatSearch showChat={showChat} setIndex={setIndex} setAllChatMessages={setAllChatMessages} setShowChat={setShowChat}
          setNewChat={setNewChat} setSelected={setSelected} allChatMessages={allChatMessages} newChat={newChat}
        setShow={setShow} show={show} setChats={setChats} chats={chats} selected={selected}   />

      
    <Container showChat={showChat} >


        {
            selected===null?
            <Heading darkMode={darkMode}>
               <h1>  Select a chat to start conversation</h1>
            </Heading>
            :  <Friend  >
            <span >
            <Menu  onClick={()=>{setShow(true);setShowChat(false)}}>
           <KeyboardBackspaceIcon fontSize='medium' htmlColor={darkMode?'white':"black"}/>
          </Menu>
                 <Link to={`/account/?user=${selected?.members?.filter(m=>m!==user?._id)[0]}`} > <Avatar src={selected?.membersPhoto.filter(mp=>mp!==user?.profilePic)[0]}/> </Link>
            <Link to={`/account/?user=${selected?.members?.filter(m=>m!==user?._id)[0]}`}
             className={darkMode?'darkModeLink':'link'} >
               <span>{selected?.membersName?.filter(name=>name!==user?.username)[0]}</span>   </Link>
             </span>
             <Tooltip title="Delete chat" arrow>
       <Button><DeleteOutlineIcon htmlColor={darkMode?'white':'black'}   onClick={handleDelete} /></Button> 
    </Tooltip>
             
           
         </Friend>
        }

       
{ selected && 
<Messages  >
{allChatMessages[index]?.map((m,i)=>(
    <Text key={i} ref={scrollRef} left={user._id!==m.senderId}>
        <Avatar src={m.senderId===user?._id?user?.profilePic:selected?.membersPhoto.filter(mp=>mp!==user?.profilePic)[0]}/>
        <Content left={user._id!==m.senderId}> <span>{m?.text}</span>  
        <Time left={user._id!==m.senderId}>{format(m.createdAt)}</Time>
        </Content>
      
    </Text>
)

)}
</Messages>}

        <InputContainer darkMode={darkMode} onSubmit={newMessage} >
        <MessageInput disabled={selected===null} darkMode={darkMode} type='text' onChange={e=>{setText(e.target.value)}} value={text} placeholder='Message'/>
        
            
            <Send  disabled={text?false:true } type='submit' >
                <SendIcon fontSize='inherit' htmlColor={text?'#0095f6':'#6a696a'}/></Send>
          
           
      
        </InputContainer>
    </Container>
        
    </Flex>
  )
}


export default Message

const Heading = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100%;
color: #b8b7b7;
color: ${props=>props.darkMode && '#626263'};
&>h1{
    font-size: 50px;
    text-align:center;
    
}
`

const Container=styled.div`
    height: 100vh;
    width: 71vw;
  
    position: relative;

    
    gap: 10px;
    display: flex;
    flex-direction: column;
    @media screen and (max-width:768px){
        width: 100vw;
        display:${props=>props.showChat?'flex':'none'};
       
      z-index: 9999;
        height: 100vh;
       
    }
    
`

const Messages=styled.div`
display: flex;
height: 100%;
flex-direction: column;
gap: 8px;
overflow-y: auto;
padding: 10px;
@media screen and (max-width:768px){
   
    }
`

const Friend=styled.div`
display: flex;
padding:  10px ;
padding-right: 25px;
border-bottom: 0.6px solid #dededf;
align-items: center;
width: 100%;
position: sticky;
top: 0;
width: 100%;
justify-content: space-between;
&>:last-child{
    cursor:pointer;
};
&>span{
    align-items: center;
    gap: 8px;
      display: flex;
      font-size: 17px;
      color: #363636;
      padding-left: 10px;
      @media screen and (max-width:768px){
        gap: 5px;
         font-size: 16px;
        padding-left: 2px;
          } 
};
@media screen and (max-width:768px){
       padding: 10px;

          } 


`

const Menu=styled.div`
    justify-content: center;
    align-items: center;  
    display:none;
    margin-right: 5px;
@media screen and (max-width:768px){  
display: flex;  
    }
`

const Text=styled.div`
  
    display:flex;
    gap: 5px;
    max-width: 50%;
    min-height: max-content;
    @media screen and (max-width:768px){  
max-width: 80% ;
    };
    align-self: ${props=>props.left?"flex-start":"flex-end"};
 
`

const Time=styled.p`
    color: #3a393a;
    font-size: 12px;
  align-self:flex-end;
  color:${props=>props.left&&'#eaeaec'}
    `

const Content=styled.div`
 border-radius: 5px;
 border-top-left-radius:0;
display: flex;
flex-direction: column;
 align-self: start;
    padding:5px 10px;
    height: max-content;
     font-size: 16px;
    color: ${props=>props.left?"white":"black"};
   background-color: ${props=>props.left?"#0095f6":"#f3f3f3"}

`

const InputContainer=styled.form`
    display: flex;
    align-items: center;
    border-radius: 25px;
    
    box-shadow: 1px 1px 2px 1px  ${props=>props.darkMode?'#444444':'#dedddf'};
    position: sticky;
    bottom: 0;
    z-index: 2;
    
    justify-content: space-between;
   width: 100%;
   background-color: #f3f3f4;
   background-color: ${props=>props.darkMode&&'black'};
   padding: 10px 25px;

   margin-bottom: 10px;
   @media screen and (max-width:768px){
       margin-bottom: 0;
       padding:  10px 12px;
         z-index: 9999;   
          } 
`

const MessageInput=styled.input`
    border: none;
    width: 90%;
    color: #292828;
   color: ${props=>props.darkMode&&'#d4d3d5'};
    font-size: 16px;
    background-color: transparent;
    &:disabled{
        cursor: not-allowed;
    };
    &:focus{
        outline: none;
    }
`

const Send=styled.button`
    background-color: transparent;
   
    cursor: pointer;
    font-size: 23px;
    border: none;
    border-radius: 5px;
    &:disabled{
        cursor: not-allowed;
    };
`





