import { Avatar,  } from '@mui/material'
import {axiosInstance} from '../config'
import { format } from 'timeago.js';
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const ChatSearch = ({selected,allChatMessages,setAllChatMessages,show,setShow,chats,setChats,setSelected,setIndex,
                    newChat,setNewChat,setShowChat}) => {

const [users,setUsers]=useState([])
const [query,setQuery]=useState('')
const [sortedChats,setSortedChats] = useState([])
const [lastMessages,setLastMessages] = useState([])
const user=useSelector(state=>state.user.currentUser)
const darkMode=useSelector(state=>state.darkMode)



useEffect(()=>{
    const getUsers=async()=>{
        const res= await axiosInstance.get("/users/all/users", {headers:{token:"Bearer "+user?.accessToken}})
        setUsers(res.data)
       
    }
    getUsers()
    
},[user])

useEffect(()=>{
    const createChat=async()=>{
        
        const details={
            members:[user?._id,newChat?._id],
            membersName:[user?.username,newChat?.username],
           membersPhoto:[newChat?.profilePic,user?.profilePic]
        }
        try{
                const res = await axiosInstance.post ("/chats/create", details
                 , {headers: {token:"Bearer "+user?.accessToken}})
                 const chatExists=chats.every(chat=>chat._id!==res.data._id)
                 
                 if(chatExists){
                  setChats(c=>[res.data,...c])
                     setSelected(res.data)
                     setSortedChats(c=>[res.data,...c])
                     setAllChatMessages((prevMessages) => [...prevMessages, []]);
                     setLastMessages(l=>[{},...l])
                 }else{
                    setNewChat(null)
                 }
                 
                
            }catch(e){
            console.log(e)
        }
    }
    newChat  && createChat()
},[newChat,user])

    useEffect(()=>{
        if(newChat){
            
            setIndex(allChatMessages.length-1)
        }else{
            let index = allChatMessages.findIndex(m=>m[0]?.conversationId===selected?._id)
            setIndex(index)
        }
      
     },[selected,allChatMessages])

     useEffect(()=>{
        if(!newChat){
            let array = []
            allChatMessages.forEach(m=>{
                let last = m[m.length-1]
               last && array.push(last)
            })
          
        
           let newChats=[]
        
           const sortedMessages =  array.sort((a, b) => {
                        
            return new Date(b?.createdAt) - new Date(a?.createdAt)
          });
          
           sortedMessages.forEach((m)=>{
          
            let chat=chats.find(c=>c._id===m?.conversationId)
            newChats.push(chat)
           })
         
            setLastMessages(sortedMessages)
            setSortedChats(newChats)
        }
     },[allChatMessages,selected,newChat])

  return (
    <SearchBox  show={show} darkMode={darkMode} >
 <Input onChange={(e)=>setQuery(e.target.value.toLowerCase())} value={query} placeholder='Search...'/>
    {users.filter(u=>u.username.includes(query|| u.name.toLowerCase().includes(query))).map(
    (user,i)=>(   
         <Recipient  key={i} selected={user===newChat} onClick={()=>{setQuery('');setNewChat(user);setShowChat(true);setShow(false)}}>

           <Avatar src={user.profilePic}/>
        <span>{user.username}</span>
       
       
    </Recipient>
    )
)}
    

{sortedChats.map((i,e)=>(
<Recipient key={e} selected={i===selected} onClick={()=>{setSelected(i);setShowChat(true);setShow(false)}}>
<Avatar src={i?.membersPhoto.filter(mp=>mp!==user?.profilePic)[0]}/>
<span>
 <h4>{i?.membersName?.filter(name=>name!==user?.username)}</h4> 
<Last darkMode={darkMode} selected={e===selected} >{ lastMessages[e]?.text}</Last>

</span>

{
    lastMessages[e]?.createdAt && <TimeAgo>
    {
     format(lastMessages[e]?.createdAt)
    } 
    </TimeAgo>

}


</Recipient>
))   

}



</SearchBox >
  )
}

export default ChatSearch

const Last=styled.p`
  color: ${props=>props.darkMode?'#a2a2a3':'#666666'};
  color: ${props=>props.selected&&'#e5e5e8'};
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
   
    font-size: 14px;

`
const TimeAgo = styled.span`
position: absolute;
right: 1.2px;

font-size: 13px;
`

const SearchBox=styled.div`
position: fixed;
z-index: 3;
display: flex;    
background-color: white;
flex-direction: column;
height: 100vh;
top: 0;
left: 4.6vw;
width: 25vw;
background-color: ${props=>props.darkMode&&'black'};
color: ${props=>props.darkMode&&'white'};
border-left: 0.5px solid #e4e3e6;
border-right: 0.5px solid #e4e3e6;
@media screen and (max-width:768px){
        
        width: 100vw;
        border: none;
       left: 0;

        height: 92.6vh;

display:${props=>props.show?"flex":"none"}
    }
`


const Input=styled.input`
        border: none;
  width: 95%;
     padding: 10px 20px;
     border-radius: 3px;
     font-size: 16px;
     align-self: center;
    background-color: #f5f3fb;
    margin-block: 15px 10px;
    &:focus{
        outline: none;
    }
  
`

const Recipient=styled.div`
    display: flex;
    gap: 8px;
    
    position: relative;
    padding: 8px 20px;
    transition: all 0.5s ease;
    cursor: pointer;
    background-color: ${props=>props.selected&&"#0095f6"};
   color: ${props=>props.selected&&"white"};
   transition: all  0.4s ease;
   align-items: center;
  
   &:hover{
    background-color: #66d1fc;
   };
    &>span{
   
       
gap: 6px;
      display: flex; 
      flex-direction : column ;
}
`