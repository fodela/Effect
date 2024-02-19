import { createSlice } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name: "auth",
    initialState:{user: null, token:null},
    reducers:{
        setCredentials:(state, {payload})=>{
            
            state.user = payload.user
            state.token = payload.accessToken
        },
        logOut: (state)=>{
            state.user = null
            state.token = null
        }
        
    }
})


export const {setCredentials, logOut} = authSlice.actions

export default authSlice.reducer;

export const selectCurrentUser = (state)=>state.auth.user
export const  selectCurrentToken = (state)=>state.auth.token