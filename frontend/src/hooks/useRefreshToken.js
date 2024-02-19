// import axios from "../app/api/axios";
// import { setCredentials } from "../features/auth/authSlice";


// const useRefreshToken = () => {
//   /* The code `const { setAuth, auth } = useAuth();` is using the `useAuth` hook to get the `setAuth`
//   function and the `auth` object. */
  
//   const { refresh_token } = auth;
//   const refresh = async () => {
//     try {
//       const res = await axios.get("auth/refresh", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${refresh_token}`,
//         },
//         withCredentials: true,
//       });

//       setCredentials((prev) => {
//         return { ...prev, accessToken: res.data?.accessToken };
//       });
//       return res.data.accessToken;
//     } catch (error) {
//       if (!error.response) {
//         console.log(" 👎", "Network error");
//       } else {
//         console.log(" 👎: refreshToken error:", error);
//       }
//     }
//   };
//   return refresh;
// };

// export default useRefreshToken;
