import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { logOut, setCredentials } from "../../features/auth/authSlice"

const baseQuery = fetchBaseQuery({
    // set base url
    baseUrl:  "http://127.0.0.1:5000/api/v1"
,
    // include credentials and prepare headers
    credentials: "include",
    prepareHeaders: (headers, {getState})=>{
        const token = getState().auth.token
        if (token){
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

// Create a wrapper query to refresh expired token
const baseQueryWithReauth = async (args, api, extraOptions) =>{
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 403){
        console.log("sending refresh token to get new access token")
        // send the refresh token
        const refreshResult = await baseQuery("/refresh", api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data){
            const user = api.getState().auth.user
            // store the new token
            api.dispatch(setCredentials({
                ...refreshResult.data, user
            }))
            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions)
        }else{
            api.dispatch(logOut())
        }
    }
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints:builder =>({})
})