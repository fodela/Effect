import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import todoReducer from "../features/todo/todoSlice"
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        [apiSlice.reducerPath]:apiSlice.reducer,
        todos: todoReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})