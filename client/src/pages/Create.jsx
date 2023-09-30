import { Avatar, Modal } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import {handleUpload,createPost} from "../apiCalls"
import {useSelector} from "react-redux"
import './loader.css'
import image from '../assets/image.jpg'
import video from '../assets/video.jpg'

const Create = ({setCreate,create,setIndex}) => {
const [selected,setSelected]=useState('Post')
const [caption,setCaption] = useState("")
const [file,setFile]=useState(null)
const user = useSelector(state=>state.user.currentUser)
const [clicked,setClicked]=useState(false)
const [uploaded,setUploaded]= useState('')



useEffect(()=>{
    const details={caption:caption,postId:user?._id,username:user?.username,profilePic:user?.profilePic,reelId:user?._id,isReel:selected==='Reel'}
    clicked &&   handleUpload(file,createPost,details,user?.accessToken,selected,setUploaded)
},[clicked])


  return (
    <Modal open={create} onBackdropClick={()=>{!clicked && setCreate(false);setIndex(null)}}>
        <Container>
            <Head>

           
            <Top selected={selected==='Post'} onClick={()=>{setSelected('Post');setFile(null)}}> Post</Top> 
             <Top selected={selected==='Reel'} onClick={()=>{setSelected('Reel');setFile(null)}} >Reel</Top>
             </Head>

         {   selected==='Post'? file ? <Image src={URL.createObjectURL(file)}/> :
          <label style={{alignSelf:'center'}} htmlFor="image">  <Logo src={image} />  </label>
            :  file ? <Video controls autoPlay={!clicked} loop src={URL.createObjectURL(file)}/>
          :  <label style={{alignSelf:'center'}} htmlFor="image">  <Logo src={video} />  </label>
        }  
            <Label >
               <label htmlFor="image"> Drag {selected==='Post'?'photos':'videos'} here</label>
               { selected==='Reel' ?
<input type="file"  id="image" onChange={(e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("video/")) {
             setFile(selectedFile);
    } else {
      alert("Please select a valid video file.");
    }
  }}/>
: <input type="file"  id="image" onChange={(e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
    } else {
      alert("Please select a valid image file.");
    }
  }}/>
              }
              
            </Label>
            <User>
                <Avatar src={user?.profilePic}/>
                <span>{user?.username}</span>
            </User>
            <Caption placeholder='Add caption' row="10" onChange={(e)=>setCaption(e.target.value)} />
            <Button disabled={!file} onClick={()=>setClicked(true)}>
                {clicked ? <div className="div"> <div className="uploading"></div>  <span>{uploaded}</span> </div>
                : 'Share'
            }
                </Button>
            
        </Container>

    </Modal>
  )
}

export default Create

const Logo=styled.img`
    width: 10vw;
    align-self: center;
    margin-top: 50px;
    @media screen and (max-width:768px){
        width: 15vw;
        height: 15vw;
    }
`

const Container=styled.div`
    position: fixed;
    width: 33vw;
    margin: auto;
    height: 75vh;
    background-color: white;
    outline: none;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    top: 0;
    bottom: 0;
    left: 0;right: 0;
border-radius: 10px;
@media screen and (max-width:768px){
        width: 80vw;
        height: 70vh;
    }
`
const Head=styled.div`
display: flex;
justify-content: space-evenly;
padding: 8px;
border-bottom: 1px solid #a8a8aa;
`

const Label=styled.div`
display: flex;
align-items: center;
gap: 15px;
align-self: center;
margin-top: 10px;
font-weight: 500;
&>label{
    cursor: pointer;
};

&>input{
    display: none;
}
`

const Top=styled.h3`
    
    font-size: 18px;
    font-weight: 400;
    padding: 10px;
    cursor: pointer;
    text-align: center;
    color: ${props=>props.selected?'blue':'#2d2c2d'};
    font-weight: ${props=>props.selected&&500};
`

const Image=styled.img`
width: 100%;
height: 80%;
`
const Video=styled.video`
height: 80%;
width: 100%;
`


const Caption=styled.textarea`
    border: none;
    padding: 4px;
    font-size: 15px;
    color: #242424;
   margin-left: 20px;
   margin-top: 5px;
  min-height: 60px;
    &:focus{
        outline: none;
    }

`

const User=styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 20px;
`

const Button=styled.button`
border: none;
margin-bottom: 15px;
color:  #1e1d1d;
font-size: 18px;
cursor: pointer;
background-color: transparent;
align-self: center;
&:disabled{
    cursor: not-allowed;
}
&:hover{
    color:#4385ff
}

`


