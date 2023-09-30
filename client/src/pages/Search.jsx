import {axiosInstance} from '../config'
import styled from 'styled-components'
import { useState, useEffect } from "react"
import {  useSelector} from "react-redux"
import { Avatar } from "@mui/material"
import { Link } from "react-router-dom"
import CloseIcon from '@mui/icons-material/Close';

const Search = ({display,setSearch,setHide,setIndex}) => {

    const [users,setUsers]=useState([])
    const [query,setQuery]=useState('')
    const user=useSelector(state=>state.user.currentUser)
    const darkMode=useSelector(state=>state.darkMode)

    useEffect(()=>{
        const getUsers=async()=>{
            const res= await axiosInstance.get("/users/all/users", {headers:{token:"Bearer "+user?.accessToken}})
            setUsers(res.data)   
        }
        getUsers()    
    },[])

  return (
   <Container darkMode={darkMode} display={display}>


    <Title>
    <h3>   Search</h3>
        <CloseIcon onClick={()=>{setSearch(false);setHide(false);setIndex(null)}}/>
        </Title>
    <InputContainer>
    <Input onChange={(e)=>setQuery(e.target.value.toLowerCase())} placeholder='Search'/>

    </InputContainer>


    {users.filter(u=>u.username.includes(query|| u.name.toLowerCase().includes(query))).map(
        (user,i)=>(
           
             <User key={i} darkMode={darkMode}>
               
              <span> <Avatar src={user.profilePic}/>
            <span>{user.username}</span>
            </span> 
            <Link   to={`/account/?user=${user._id}`} > 
              <Button darkMode={darkMode} >View Profile</Button>
              </Link>
        </User>
        )
    )}
   

   </Container>
  )
}

export default Search

const Container=styled.div`
    min-height: 100vh;
   background-color: white;
   background-color: ${props=>props.darkMode&&'black'};
   color:${props=>props.darkMode&&'white'};
    width: 26vw;
    border-left: 0.5px solid #e9e8e9;
    position: fixed;
    padding: 2.4vw 1.5vw;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    box-shadow: 10px 0px 10px -5px ${props=>props.darkMode?'#2a2929':'#c5c4c6'};
    top: 0;
    left: 4.6vw;
    display: ${props=>props.display?"flex":"none"};
    flex-direction: column;
   
   z-index: 4;
  
`

const Title=styled.div`
    font-size: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4vh;
    &>h3{
        font-weight: 400;
    }
 &>:last-child{
    cursor: pointer;
 }
`

const User=styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 20px;
    color:${props=>props.darkMode&&'white'};
    padding: 5px 7px;
   
    &>span{
        display: flex;
  gap: 8px;
    align-items: center;
    }
`
const Button=styled.button`
    border: none;
    color: #1d72fa;
    background-color: transparent;
    transition: all 0.2s ease;
    cursor: pointer;
    font-size: 15px;
    &:hover{
        color: #222;
        color: ${props=>props.darkMode && '#eceaea'};
    }
    
`

const InputContainer=styled.div`
    display: flex;
    align-items: center;

    background-color: #f6f5f5;
    border-radius: 5px;
    font-size: 18px;
    padding: 8px 12px;
    margin-bottom: 4vh;
`

const Input=styled.input`
    border: none;
    flex:9;
    background-color: transparent;
 font-size: 18px;
 color: #3f3f3f;
    &:focus{
        outline: none;
    }
`

