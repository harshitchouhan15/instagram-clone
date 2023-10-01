import { Modal } from '@mui/material';
import React, { useState } from 'react'
import styled from 'styled-components';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import './loader.css'
import { useSelector, useDispatch } from 'react-redux';
import {  loginFailure } from '../redux/userRedux'
import {toggleMode,removeDarkMode} from "../redux/darkModeRedux"

const Hamburger = () => {
    const [isOpen, setIsOpen] = useState(false);
    const darkMode=useSelector(state=>state.darkMode)
    const dispatch=useDispatch()

  return (
    <div className='menuIcon'  >
       
      < SettingsOutlinedIcon onClick={()=>setIsOpen(!isOpen)}/>

 <Modal open={isOpen} onBackdropClick={()=>setIsOpen(false)} >
    <Container darkMode={darkMode} >
        <Mode>
           
            <SwitchMode  onClick={()=>dispatch(toggleMode())}>
                <Color darkMode={darkMode}  />
            </SwitchMode>
            <span>Dark Mode</span>
        </Mode>

        <Logout darkMode={darkMode} 
         onClick={()=>{dispatch(loginFailure());dispatch(removeDarkMode())}}> 
         <PowerSettingsNewOutlinedIcon/>
          <p>Logout</p> 
         </Logout>
   
    </Container>
 </Modal>
    </div>
  )
}

export default Hamburger

const Container=styled.div`
    position: fixed;
    background-color: white;
    background-color : ${props=>props.darkMode&&'black'};
    color : ${props=>props.darkMode&&'white'} ;
    right: 42px;
    top: 39px;
      flex-direction: column;
      height: max-content;
      gap: 10px;
      padding: 20px;
      width: 60vw;
   display: flex;
  outline: 0.5px solid white;
  outline: ${props=>props.darkMode&&'0.5px solid #424243'};
`

const Logout=styled.span`
      padding: 10px;
        cursor: pointer;
        transition:all 0.5s ease;
        border-radius: 5px;
        display: flex;align-items: center;
        gap: 16px;
        color : ${props=>props.darkMode&&'white'} ;
   
`
const Mode=styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
  padding: 7px 10px;
  padding: ${props=>props.hide&&'7px 0'};

`

const SwitchMode=styled.div`
    width: 40px;
    height: 20px;
    border: 1px solid ${props=>props.darkMode?'white':'black'};
    border-radius: 10px;
    padding: 1px  ;
    display: flex;
    align-items: center;
    background-color: white;
  
   
`
const Color=styled.div`
       width: 18px;
       cursor: pointer;
        height: 18px;
        border-radius: 50%;
        background-color: #dcdedf;
        background-color:${props=>props.darkMode&&'black'};
        transform: translateX(${props=>props.darkMode&&'18px'});
`
