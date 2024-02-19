import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    /* The `endpoints` object is defining the available API endpoints for the `authApiSlice`. In this
    case, there is only one endpoint called `login`. */
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials =>({
                url: "/auth/login",
                method: "POST",
                body: { ...credentials}
            })
        })
    })
})

export const {useLoginMutation} = authApiSlice