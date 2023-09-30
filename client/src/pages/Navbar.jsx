import photo1 from "../assets/asset 12.svg"
import photo2 from "../assets/home_png.png"
import photo3 from "../assets/asset 14.svg"
import photo4 from "../assets/asset 15.svg"
import photo5 from "../assets/asset 16.svg"
import photo6 from "../assets/asset 17.svg"
import photo7 from "../assets/asset 18.svg"
import photo8 from "../assets/asset 19.svg"
import black from "../assets/black.svg"
import photo from "../assets/asset 0.png"
import {Avatar} from "@mui/material"
import whiteHome from "../assets/whiteHome.svg"
import whiteSearch from "../assets/whiteSearch.svg"
import whiteExplore from "../assets/whiteExplore.svg"
import whiteReel from "../assets/whiteReel.svg"
import whiteMessage from "../assets/whiteMessage.svg"
import whiteLike from "../assets/whiteLike.svg"
import whiteCreate from "../assets/whiteCreate.svg"
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import {toggleMode,removeDarkMode} from "../redux/darkModeRedux"
import {axiosInstance} from '../config'
import styled from "styled-components"
import { useState, useEffect } from "react"
import Search from "./Search"
import Create from "./Create"
import {loginFailure} from "../redux/userRedux"
import { useDispatch , useSelector} from "react-redux"
import { Badge } from "@mui/material"
import Notification from "./Notification"
import { StyledLink } from '../App';
import { useLocation } from "react-router-dom";
import jwtDecode from 'jwt-decode'; // Import a JWT decoding library

const Navbar = ({socket}) => {
const [create,setCreate]=useState(false)
const [search,setSearch]=useState(false)
const [noti,setNoti]= useState(false)
const dispatch=useDispatch()
const [notifications,setNotifications] = useState([])
const [hide,setHide]  =useState(false)
const darkMode=useSelector(state=>state.darkMode)
const user=useSelector(state=>state.user.currentUser)
const location= useLocation()
const value = location.pathname.split('/')[1]
const [index,setIndex] = useState(null)
const decodedToken = jwtDecode(user?.accessToken);

const expirationTimeInSeconds = decodedToken.exp - Date.now() / 1000;
setTimeout(() => {
  dispatch(loginFailure())
  dispatch(removeDarkMode())
}, expirationTimeInSeconds * 1000);

useEffect(()=>{
    const getNoti = async()=>{
      const res = await axiosInstance.get('/noti/get/'+user?._id, {headers:{token:'Bearer '+user?.accessToken}})
      setNotifications(res.data)
    }
    getNoti()
  },[user])

  useEffect(()=>{
    let array=notifications.slice()
  socket?.current?.on('followerNotification', d=>{
    array.push({notificationId:d.profileId,message:d})
    setNotifications(array)
  })

},[])

useEffect(()=>{
  let array=notifications.slice()

  socket?.current?.on('getLikedNoti', d=>{
    array.push({notificationId:d.profileId,message:d})
    setNotifications(array)
  })
},[])

useEffect(()=>{
  let array=notifications.slice()

  socket?.current?.on('getCommentedNoti', d=>{
    console.log(d)
    console.log('came')
    array.push({notificationId:d.profileId,message:d})
    setNotifications(array)
  })
},[])

const handleClick = (i)=>{ 
  i===1?setSearch(!search):setSearch(false);
  i===6&&setCreate(true);
  i===5?setNoti(!noti):setNoti(false);
  i!==0&&i!==2&&i!==3&&i!==6&&i!==7 && !hide?setHide(!hide):setHide(false);
  index!==i ? setIndex(i) :setIndex(null)
  
  if(i===1 && noti){
    setNoti(false); setHide(true)
  }
  if( i===5 && search){
    setSearch(false) ;setHide(true)
  }
 }


  return (

    <>
   <Container darkMode={darkMode} search={search}>
  

<Search setIndex={setIndex} setHide={setHide}  display={search} setSearch={setSearch}/>
<Notification setIndex={setIndex} setHide={setHide}  noti={noti} setNotifications={setNotifications}   notifications={notifications}  setNoti={setNoti}/>
<Create  setIndex={setIndex} create={create} setCreate={setCreate}/>

<FixedNavbar>
    {
       noti||search||value==='direct-inbox'?    
          <LogoImage src={photo}/>
       :  
       <Logo src={darkMode?photo1:black}/>
    }


    <List>

            {data.map((item,i)=>(
              i===6?  <ListItem mess={ value==='direct-inbox'===item.query}  index={index===i} hide={hide || value==='direct-inbox'} selected={index===i?true:value===item.query} darkMode={darkMode}   
              onClick={()=>handleClick(i)} >
                       
                       {i===5?<Badge badgeContent={notifications.length} color="primary" >
                         <img src={darkMode?item.darkModeSrc:item.src} />
                       </Badge> :item.profile?<Avatar   src={user?.profilePic} sx={{width:30,height:30}} />
                       :
                       <img src={darkMode?item.darkModeSrc:item.src}/> 
           
           
                        } 
                   < Item hide={hide || value==='direct-inbox' }  >{item.name}</ Item> 
                   
                    </ListItem> 
    :<StyledLink darkMode={darkMode} to={i===data.length-1?`/account/?user=${user._id}`:item.url} key={i}  >  
   <ListItem mess={ value==='direct-inbox'===item.query}  index={index===i} hide={hide || value==='direct-inbox'} selected={index===i?true:value===item.query} darkMode={darkMode}   
   onClick={()=>handleClick(i)} >
            
            {i===5?<Badge badgeContent={notifications.length} color="primary" >
              <img src={darkMode?item.darkModeSrc:item.src} />
            </Badge> :item.profile?<Avatar   src={user?.profilePic} sx={{width:30,height:30}} />
            :
            <img src={darkMode?item.darkModeSrc:item.src}/> 


             } 
        < Item hide={hide || value==='direct-inbox' }  >{item.name}</ Item> 
        
         </ListItem> 
         </StyledLink>  
            ))}
    </List>
  

<Bottom >
<Mode hide={noti||search||value==='direct-inbox'} >
  <SwitchMode
   onClick={()=>dispatch(toggleMode())} darkMode={darkMode}> 
    <Color darkMode={darkMode} /> 
    </SwitchMode>
    <Name hide={noti||search||value==='direct-inbox'}>Dark Mode</Name>
  </Mode>
        <Logout darkMode={darkMode} hide={noti||search||hide||value==='direct-inbox'}
          onClick={()=>{dispatch(loginFailure());dispatch(removeDarkMode())}}> 
           <PowerSettingsNewOutlinedIcon/> 
           <Name hide={noti||search||value==='direct-inbox'}>Logout</Name>
            </Logout>
    </Bottom>
</FixedNavbar>

   </Container>

   <Menu darkMode={darkMode}>
 
   
       <StyledLink to="/">< img src={darkMode?whiteHome:photo2} /></StyledLink>
       <StyledLink to="/explore"> < img src={darkMode?whiteSearch:photo3} /></StyledLink>
       < img onClick={()=>setCreate(true)} src={darkMode?whiteCreate:photo8} />
    
        <StyledLink to="/reels">   <    img src={darkMode?whiteReel:photo5} /></StyledLink>
       <StyledLink to={`/account/?user=${user._id}`}> <Avatar sx={{width:'8vw',height:'8vw'}} src={user?.profilePic}/></StyledLink>

   </Menu>

   </>
  )
}

export default Navbar

const Container=styled.div`
    height: 100vh;
    width: 16vw;
    top: 0;
    display: flex;
    flex-direction: column;
    position: static;
    overflow: ${props=>props.search?"visible":"hidden"}; 
    @media screen and (max-width:768px){
        display: none;
    }
`

const FixedNavbar=styled.div`
     height: 100vh;
    width: 16vw;
   
    padding: 2.5vw 0.8vw 3vw 0.8vw;
    border-right: 0.9px solid #dcdcdd;
    top: 0;
    display: flex;
    flex-direction: column;
    left: 0;
    position: fixed;
  
    //overflow: ${props=>props.search?"visible":"hidden"}; 
`

const Logo=styled.img`
  width: 150px;
  padding-left: 15px;
  margin-bottom: 8vh;

`
const List=styled.ul`
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
  
`

const ListItem=styled.li`
    display: flex;
    gap: 16px;
    align-items: center;
    padding:  10px;
    font-size: 15px;
    border-radius: 7px;
    width:${props=> props.hide  &&'max-content'};
    width:${props=>  props.mess &&'max-content'};
    border: ${props=>props.selected && props.hide && props.index  &&'0.5px solid #b5b2b2' };

    border: ${props=> props.mess &&'0.5px solid #b5b2b2' };
    cursor: pointer;
    background-color : ${props=>props.selected&&!props.hide&&'#f3f1f1'};
    background-color : ${props=>props.selected&&props.darkMode&&'#2f2e2f'};
    background-color : ${props=>props.selected&& props.hide || props.mess &&'transparent'};

    &:hover{
        background-color: #f3f1f1;
        background-color : ${props=>props.darkMode&&'#2f2e2f'};
    }
    `
  

    const Item=styled.span`
        display: ${props=>props.hide&&"none"};
    `
const Name=styled.span`
    display: ${props=>props.hide&&'none'};
`


const Bottom=styled.div`
    display: flex;
   
    gap: 2px;
    flex-direction:column;
    margin-top: 18vh;
    font-size: 15px;
    border-radius: 8px;

`

const Logout=styled.span`
      padding: 10px;
        cursor: pointer;
        transition:all 0.5s ease;
        border-radius: 5px;
        display: flex;align-items: center;
        gap: 16px;
    width:${props=>props.hide&&'max-content'};
       
    &:hover{ 
        background-color: #edebeb; 
        background-color : ${props=>props.darkMode&&'#2f2e2f'};
    }
`
const Mode=styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
  padding: 7px 10px;
  padding: ${props=>props.hide&&'7px 0'};

`

const SwitchMode=styled.div`
    width: 3vw;
    height: 1.5vw;
    border: 1px solid ${props=>props.darkMode?'white':'black'};
    border-radius: 12px;
    padding: 1px 0.1vw;
    display: flex;
    align-items: center;
    background-color: white;
    cursor: pointer;
   
`
const Color=styled.div`
       width: 1.4vw;
     
        height: 1.4vw;
        border-radius: 50%;
        background-color: #dcdedf;
        background-color:${props=>props.darkMode&&'black'};
        transform: translateX(${props=>props.darkMode&&'1.4vw'});
`

const LogoImage=styled.img`
    width: 40px;
    padding-left: 6px;
  margin-bottom: 8.3vh;
`


const Menu = styled.div`
    display: none;
    justify-content: space-between;
    align-items: center;
    padding: 0px 25px;
    position: fixed;
    height: 7vh;
    width: 100vw;
    bottom: 0;
    background-color: ${props=>props.darkMode?'black':'white'};
    z-index: 999;
    @media screen and (max-width:768px){
        display: flex;
    }
`



const data=[
{src:photo2,
  darkModeSrc:whiteHome,
        query:'',
        url:"/",
    name:"Home"},
    {
      src:photo3,
      darkModeSrc:whiteSearch,
        query:'Search',
        name:"Search"},
        {src:photo4,
          darkModeSrc:whiteExplore,
            url:"/explore",
            query:'explore',
            name:"Explore"},
            {src:photo5,
              darkModeSrc:whiteReel,
              url:"/reels",
              query:'reels',
              name:"Reels"},
            
                {src:photo6,
                  darkModeSrc:whiteMessage,
                    url:"/direct-inbox",
                    query:'direct-inbox',
                    name:"Message"},
                {src:photo7,
                  darkModeSrc:whiteLike,
                    query:'Notifications',
                    
                    name:"Notifications"},
                 
                       {
                        src:photo8,
                        darkModeSrc:whiteCreate,
                       
                        query:'Create',
                        name:"Create"},
                        {profile:true,
                            query:'account',
                            name:"Profile"}
]


    
