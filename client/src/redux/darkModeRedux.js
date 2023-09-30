import {createSlice} from "@reduxjs/toolkit"


const darkModeSlice = createSlice({
    name:"darkMode",

    initialState:false,

    reducers:{
       toggleMode:(state)=>{
        return !state
       },
       removeDarkMode:(state)=>{
        return false
       }
        
    }
})


export const {toggleMode,removeDarkMode} = darkModeSlice.actions
export default darkModeSlice.reducer