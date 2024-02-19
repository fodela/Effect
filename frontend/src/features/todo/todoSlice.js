import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import  { axiosPrivate } from "../../app/api/axios"


const initialState = {
allTodos: [
    {id:1,description:"integrate redux",is_completed:false, is_delegated:false,do_immediately:false, is_due:false, },
    {id:2,description:"finish webmails",is_completed:false, is_delegated:false,do_immediately:false, is_due:false, },
    {id:3,description:"clean up impact nutrition",is_completed:false, is_delegated:false,do_immediately:false, is_due:false, },
],
}

// export const fetchAllTodos = createAsyncThunk("/todos/fetchAllTodos", async ()=>{
//     try {
//         const res = await axiosPrivate.get("/tasks", {
//                   signal: controller.signal,
//                   headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${accessToken}`,
//                   },
//                   withCredentials: true,
//                 });
//     } catch (error) {
//        return error.message 
//     }
// })

const todoSlice = createSlice({
    name:"todos",
    initialState:{
        allTodos: [
            {id:1,description:"integrate redux",is_completed:false, is_delegated:false,do_immediately:false, is_due:false, },
            {id:2,description:"finish webmails",is_completed:false, is_delegated:false,do_immediately:false, is_due:false, },
            {id:3,description:"clean up impact nutrition",is_completed:false, is_delegated:false,do_immediately:false, is_due:false, },
        ],
        },
    reducers:{
        setAllTodos:(state,{payload})=>{
            state.allTodos = payload.allTodos
        },
        postAdded(state,{payload}){
            state.allTodos.push(payload)
        }
    }
})

export const {setAllTodos, postAdded} = todoSlice.actions

export default todoSlice.reducer

export const selectCurrentAllTodos = (state)=>state.todos.allTodos

