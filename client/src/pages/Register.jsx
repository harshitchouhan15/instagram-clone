import { useState, useEffect } from "react"
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
import image from '../assets/login.png'
import './loader.css'




const Register = () => {
const [inputs,setInputs]=useState({})
const dispatch=useDispatch()
const [error,setError]=useState(false)
const [showPassword,setShowPassword]=useState(false)
const [click,setClick]=useState(false)

const handleChange=(e)=>{
  const value= e.target.value
  setInputs(n=>{
    return {
      ...n, [e.target.name]:value
    }
  })
}

const validatePassword = (password) =>{
  const capitalLetterRegex = /[A-Z]/;
  const numberRegex = /[0-9]/;
  const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
  
  const hasMinimumLength = inputs.password.length>=8
    
  const hasCapitalLetter = capitalLetterRegex.test(inputs.password)
  const hasNumber = numberRegex.test(inputs.password)
  const hasSpecialCharacter = specialCharacterRegex.test(inputs.password)

  return hasMinimumLength && hasCapitalLetter && hasNumber && hasSpecialCharacter



}



const handleSubmit = async()=>{
  
  if(validatePassword(inputs.password)){
    dispatch(loginStart())
    try{
      const res = await axiosInstance.post("/auth/register", inputs)
      dispatch(loginSuccess(res.data))
  
  
    }catch(e){
      dispatch(loginFailure())
      setError(true)
    }
  }else{
    setClick(false)
    alert("Password is invalid. It must have at least 8 characters and include at least one capital letter, one number, and one special character.")
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
    <Image src={image} />

    <Right>
    <Form  onSubmit={(e)=>{e.preventDefault();setClick(true)}} >
      <Logo  src={photo} />
      <MobileLogo src={mobile} />
 
      <p>Sign up to see photos and videos from your friends.</p>

      <CssTextField required type="email" onChange={handleChange} name="email" id='email' label="Email"/>
      <CssTextField required type="text" onChange={handleChange} name="name" id='fullname' label="Full Name"/>
      <CssTextField required type="text" onChange={handleChange} name="username" id='username' label="Username"/>
      <CssFormControl  required variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            onChange={handleChange}
            
            name='password'
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
        </CssFormControl>
<Button   click={click} disabled={click} type='submit'> 
      {click?
        <div className="spinner"></div>  
      : 'Sign up' }
        
        </Button>

      {error&& 
      <span>Try with unique username and email</span>
      }
     
    </Form>

    <Bottom>
      <p>Have an account?</p>
      <Link to="/login" className="link color">Log in</Link>
    </Bottom>

    </Right>
   </Container>
  )
}

export default Register


const CssTextField=styled(TextField)`

@media screen and (max-width:768px){
 margin-top: 5px;
};
`

const CssFormControl=styled(FormControl)`
@media screen and (max-width:768px){
 margin-top: 5px;
};
`

const Container=styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
gap: 10vw;

`

const Image=styled.img`
 box-shadow: 1px 1px 2px 1px #d2d1d4;
 @media screen and (max-width:768px){
  display: none;
};
`
const Right=styled.div`
  display: flex;
  flex-direction: column;
gap: 15px;
`

const Form=styled.form`
     width: 23vw;
     flex-direction: column;
    display: flex;
    justify-content: space-evenly;
   height: 68vh;
    padding: 3vh 2vw;
    border: 1px solid #d3d2d2;
    @media screen and (max-width:768px){
  width: 80vw;
  height: 65vh;
  padding: 1.5vh 2vw;
};
    &>p{
      color: #3b3a3a;
      margin-bottom: 10px;
      text-align: center;
    };
    &>span{
      color: red;
      margin-block: 5px;
      text-align: center;
    }
`
const Logo=styled.img`
height: 58px;
margin-bottom: 14px;
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
}
`



const Bottom=styled.div`
  display: flex;
  justify-content: center;
    align-items: center;
    padding: 3vh 2vw;
    border: 1px solid #d3d2d2;
    width: 23vw;
    gap: 8px;
    @media screen and (max-width:768px){
  width: 80vw;
}
`

const Button=styled.button`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
  background-color: #0095f6;
  margin-top: 10px;
  font-size: 15px;
  &:hover{
    background-color: #1877f2
  };
  &:focus{
    cursor:not-allowed;
    background-color: #1877f2
  }
`