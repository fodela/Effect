import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    count:25,
}

const counterSlice = createSlice({
    name:"Counter",
    initialState,
    reducers:{
        increment: (state)=>{
            return state.count += 1
        },
        decrement: (state)=>{
            return state.count -= 1
        },
        incrementByAmount : (state, action)=>{
            return state.count += action.payload
        }
    }
})