import { useEffect, useState } from "react"
import styled from "styled-components"
import photo from "../assets/black.svg"
import {axiosInstance} from '../config'
import mobile from "../assets/asset 0.png"
import {useDispatch} from "react-redux"
import {loginSuccess,loginStart,loginFailure} from "../redux/userRedux"
import { Link } from "react-router-dom"
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import { InputAdornment, InputLabel } from "@mui/material"
import './loader.css'


const Login = () => {
  const [password,setPassword]=useState('')
const [username,setUsername]=useState('')
const dispatch=useDispatch()
const [showPassword,setShowPassword]=useState(false)
const [error,setError]=useState(false)
const [click,setClick]=useState(false)



const handleSubmit = async()=>{
 
  dispatch(loginStart())
  try{
    const res = await axiosInstance.post("/auth/login", {username,password})
    dispatch(loginSuccess(res.data))

  }catch(e){
    dispatch(loginFailure())
    setError(true)
  }
}

useEffect(()=>{
  click && handleSubmit()
  
},[click])

useEffect(()=>{
if(  error) {
    setClick(false)
    setTimeout(()=>setError(false),3000)
  }
},[error])

  return (
   <Container>
    <Form onSubmit={(e)=>{e.preventDefault();setClick(true)}} >
      <Logo  src={photo} />
      <MobileLogo src={mobile} />
      
      <p>Sign up to see photos and videos from your friends.</p>

    <TextField  onChange={(e)=>setUsername(e.target.value)} label='Username or Email'  id='name' />
  
    <FormControl  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            onChange={(e)=>setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>setShowPassword(!showPassword)}
                  onMouseDown={(e)=>e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>


      <Button click={click} disabled={click} type='submit'>
        {click?
        <div className="spinner"></div>  
      : 'Log in' }
        
        </Button>
      


      {error&&
       <span>wrong credentials!</span> }
    </Form>

    <Bottom>
      <p> Don't have an account?</p>
      <Link to="/sign-up"  className="link color">Sign up</Link>
    </Bottom>
   </Container>
  )
}

export default Login

const Container=styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
flex-direction: column;
gap: 15px;
`

const Form=styled.form`
     width: 22vw;
     flex-direction: column;
    display: flex;
    justify-content: space-evenly;
   height: 52vh;
    padding: 3vh 2vw;
    border: 1px solid #d3d2d2;
    @media screen and (max-width:768px){
  width: 75vw;
};
    &>p{
      color: #3b3a3a;
      margin-bottom: 10px;
      text-align: center;
    };
    &>span{
      color: red;
      margin-top: 5px;
      text-align: center;
    }
`
const Logo=styled.img`
  height: 60px;
  margin-bottom: 16px;
  @media screen and (max-width:768px){
  display: none;
}
`

const MobileLogo=styled.img`
align-self: center;
width: 60px;
display: none;
margin-bottom: 14px;
@media screen and (max-width:768px){
  display: block;
}`

const Bottom=styled.div`
  display: flex;
  justify-content: center;
    align-items: center;
    padding: 3vh 2vw;
    border: 1px solid #d3d2d2;
    width: 22vw;
    gap: 8px;
    @media screen and (max-width:768px){
  width: 75vw;
};
`

const Button=styled.button`
  color: white;
  border: none;
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0095f6;
  &:hover{
    background-color: #1877f2
  };
  &:disabled {
  cursor: not-allowed;
  background-color: #1877f2
};
&:focus{
    
    background-color: ${props=>props.click&& '#1877f2' };
  }

 
`