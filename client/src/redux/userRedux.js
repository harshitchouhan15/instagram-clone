import {createSlice} from "@reduxjs/toolkit"


const userSlice = createSlice({
    name:"user",

    initialState:{
        isFetching:false,
        currentUser:null,
        error:false
    },

    reducers:{
        loginStart:(state)=>{
            state.isFetching=true
            state.currentUser=null
            state.error=false
        },

        loginSuccess:(state,action)=>{
            state.isFetching=false
            state.currentUser=action.payload
            state.error=false
           
        },
        
        loginFailure:(state)=>{
            state.isFetching=false
            state.currentUser=null
            state.error=true
        },
        
    }
})


export const {loginFailure,loginStart,loginSuccess} = userSlice.actions
export default userSlice.reducer