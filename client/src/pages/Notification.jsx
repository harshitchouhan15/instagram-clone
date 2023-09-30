import {axiosInstance} from '../config'
import styled from 'styled-components'
import { useState, useEffect } from "react"
import { useSelector} from "react-redux"
import CloseIcon from '@mui/icons-material/Close';

const Notification = ({noti,setNoti,notifications,setNotifications,setHide,setIndex}) => {
    const darkMode=useSelector(state=>state.darkMode)
    const [selected,setSelected]=useState(null)
    const user=useSelector(state=>state.user.currentUser)
    const [clicked,setClicked]=useState(false)
    const screenWidth = window.innerWidth

useEffect(()=>{
    const handleDelete= async()=>{
        try{
            await axiosInstance.delete('/noti/'+selected,  {headers:{token:'Bearer '+user?.accessToken}})
            
        }catch(e){
            console.log(e)
        }   
    }
    selected && handleDelete()
},[selected])
    
useEffect(()=>{
    const deleteAll=async()=>{
        try{
            await axiosInstance.delete('/noti/all/'+user?._id,  {headers:{token:'Bearer '+user?.accessToken}})
            
            setNoti(false);
           
            setClicked(false)
        }catch(e){
            console.log(e)
        }
    }
  clicked && deleteAll()
},[clicked])

   

  return (
   <Container darkMode={darkMode} display={noti}>


    <Title darkMode={darkMode}>
    <h3 style={{fontWeight:400}}>  Notifications</h3>
        <CloseIcon onClick={()=>{setNoti(false);screenWidth>768&&setHide(false);screenWidth>768&&setIndex(null)}}/>
        </Title>
   {notifications.map((m,i)=>(
    <Message darkMode={darkMode} key={i}>
 <span>{m.message?.text}</span>
   <CloseIcon onClick={()=>{setNotifications(notifications.filter(n=>n._id!==m._id));setSelected(m._id)}}  htmlColor='blue' />
    </Message>
   )

   )}
   {notifications.length>0&&
   <Delete onClick={()=>{setNotifications([]);setClicked(true)}} > Clear all </Delete>
}

   </Container>
  )
}

export default Notification

const Container=styled.div`
    height: 100vh;
   background-color: white;
   background-color:${props=>props.darkMode&&'black'};
    width: 26vw;
    border-left: 0.5px solid #e9e8e9;
    position: fixed;
    padding: 2.4vw 0;
    overflow-y:auto;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    box-shadow: 10px 0px 10px -5px ${props=>props.darkMode?'#2a2929':'#c5c4c6'};
    top: 0;
    left: 4.6vw;

    scrollbar-width:none;
    &::-webkit-scrollbar{
        display: none;
    };
    display: ${props=>props.display?"flex":"none"};
    flex-direction: column;
    color:${props=>props.darkMode&&'white'};
   z-index: 6;
   @media screen and (max-width:768px) {
    height: 93vh;
    width: 100vw;
    border: none;
    left: 0;
    padding: 2vw;
    z-index: 999;
    border-radius: 0;
    box-shadow: none;

   }
  
`
const Delete=styled.button`
   border:none;
   background-color: transparent;
   color:blue;
   cursor:pointer;
   font-size: 18px;
   margin-top: 10px;
`

const Title=styled.div`
    font-size: 23px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5vh;
    padding:0  2vw;
    color: #3c3c3d;
    font-family:  Courier, monospace;
    color:${props=>props.darkMode&&'white'};
    &>h3{
        font-weight: 400px;
    };
    @media screen and (max-width:768px) {
    font-size: 21px;
   } 
 &>:last-child{
    cursor: pointer;
 }`

const Message=styled.div`
display: flex;
justify-content: space-between;
align-items: center;
transition: all 0.5s ease;
margin-bottom: 1px;
padding: 10px 2vw;
&:hover{
    background-color: #ebeaeb;
    background-color:${props=>props.darkMode&&'#363536'}; 
};
&>span{
    display: flex;
gap: 8px;
align-items: center;
};
&>:last-child{
        cursor: pointer;
    }
`

const Cross=styled.button`
  border:none;

    
    background-color: transparent;
   
    cursor: pointer;
    font-size: 15px;
    &:hover{
    
   
    color: #434343;
}
`


