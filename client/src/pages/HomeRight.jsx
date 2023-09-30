import { Avatar } from '@mui/material'
import {axiosInstance} from '../config'
import React, { useEffect, useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { loginSuccess } from '../redux/userRedux'


const HomeRight = ({socket}) => {
    const [following,setFollowing]= useState([])
    const user = useSelector(state=>state.user.currentUser)
    const darkMode=useSelector(state=>state.darkMode)
    const [suggestions,setSuggestions] = useState([])
    const [index,setIndex]=useState(false)
    const [array,setArray] = useState([])
    const dispatch=useDispatch()
    const [isFollowing,setIsFollowing] = useState([])


useEffect(()=>{
  setArray(Array(suggestions.length).fill(null))
  setIsFollowing(Array(suggestions.length).fill(false))

},[suggestions])

const selected = (i,p)=>{
    const copy= array.slice()
    copy[i] = p
    setArray(copy)
    const dummy = isFollowing.slice()
               dummy[i] = !dummy[i]
               setIsFollowing(dummy)
}
 

    useEffect(()=>{
        const handleFollow=async(profile)=>{
   

            const message={userId:user._id,profileId:profile,text:`${user.username} started following you.`}
            try{
               
               await axiosInstance.post('/noti/create', {notificationId:profile,message}, {headers:{token: "Bearer "+user.accessToken}})
            socket?.current?.emit('startedFollowing',  message )
             
               const res= await axiosInstance.put("/users/follow/"+profile, {userId:user._id}, {headers:{token: "Bearer "+user.accessToken}})
               setIndex(null)
               
               dispatch(loginSuccess(res.data))
              
            }catch(e){
                console.log('')
            }
         
        }
        array[index] && handleFollow(array[index])
    },[index,array])

    useEffect(()=>{
        const getUsers = async()=>{
            const res = await axiosInstance.get('/users/friends/'+user?._id, {headers:{token: "Bearer "+user?.accessToken}})
            setFollowing(res.data.allFollowing)
            
        }
        getUsers()
    },[])

useEffect(()=>{
    const getSuggestions = async()=>{
        const res = await axiosInstance.get('/users/suggestions/users',  {headers:{token: "Bearer "+user?.accessToken}})
        let array=[]
        const users = res.data.filter(u=>u._id!==user?._id )
        users.forEach(u => {
            const isNotFollowing = following.every(f=>f._id!==u?._id)
            isNotFollowing && array.push(u)
        });
        setSuggestions(array)
        
    }
    getSuggestions()
},[following])

  return (
   <Container>
{following.length!== 0 &&<h2>You are following</h2>}
    <Top show={following.length!== 0} >
        {following.map((item,i)=>(
  <Profile key={i}>
<Link to={`/account/?user=${item._id}`}>  <Avatar sx={{width:'3.4vw',height:'3.4vw'}} src={item.profilePic} /> </Link>
  <span>{item.username}</span>
  
    </Profile>
        ))}

    </Top>
    <h2>Suggested for you</h2>
    <Suggestions>
        {
            suggestions.map((item,i)=>(
                <User darkMode={darkMode} key={i}>
               <Cover>     <Link to={`/account/?user=${item._id}`} className='link' style={{color:'white'}} > 
                  <Avatar sx={{width:'3.4vw',height:'3.4vw'}}  src={item.profilePic} />
                  </Link>
                  <Name darkMode={darkMode} >{item.username}</Name> 
                  </Cover>  
              <Button isFollowing={isFollowing[i]} onClick={()=>{setIndex(i);selected(i,item._id)}} >
                {!isFollowing[i]?'Follow':'UnFollow'}
             </Button>   
               
                </User>
            ))
        }

    </Suggestions>


   </Container>
  )
}

export default HomeRight

const Container=styled.div`
    padding: 30px 0 30px 80px;
    display: flex;
    flex-direction: column;
    width: 34%;
    gap: 15px;
    height: 100vh;
    position: sticky;
    overflow-y:scroll;
    top: 0;
    scrollbar-width:none;
    &::-webkit-scrollbar{
        display: none;
    };
    &>h2{
        font-family: 'Poppins';
        font-weight: 400;
    }
    @media screen and (max-width:768px){
        display: none;
   

 }
`

const Top=styled.div`
display: ${props=>props.show?'flex':'none'};
flex-wrap: wrap;
gap: 20px;
margin-bottom: 8vh;
`
const   Profile=styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
`


const Suggestions = styled.div`
    display: flex;
flex-direction: column;
gap: 8px;

`

const Button=styled.button`
  border: none;
  padding: 10px;
  font-size: 15px;
  
  background-color: transparent;
 text-decoration: none;
  transition:all 0.5s ease;
  cursor: pointer;
  opacity:1;
 
  color:${props=>props.isFollowing?'#222':'#0095f6'};
  &:hover{
    color: #171717;
  }
`
const User=styled.div`
display: flex;
align-items: center;
gap: 10px;
position:relative;
justify-content: space-between;
padding: 8px;

width: 80%;
transition:all 0.5s ease;
border-radius: 3px;

`
const Name = styled.h3`
 color:#2b2a2b;
 font-weight: 400;
 font-size: 16px;
color:${props=>props.darkMode && '#e8e8e9'}
`

const Cover = styled.div`
display: flex;
align-items: center;
gap: 15px;
`

