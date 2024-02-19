import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../app/api/axios"

const fetchWallpaper = createAsyncThunk("get/wallpaperLink", async()=>{
    try {
        // check if the  image is already stored in local storage
        const storedImageUrl = localStorage.getItem("wallpaper_image_url");
        if (storedImageUrl) {
          setWallpaperLink(storedImageUrl)
          return;
        }
        let randomNumber1 = Math.floor(Math.random() * 10) + 1;
        let randomNumber2 = Math.floor(Math.random() * 10) + 1;

        // If the image is not in local storage, fetch a new one from Unsplash
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?page=${randomNumber1}&query=wallpaper nature`,
          {
            params: {
              client_id: apiKey,
            },
          }
        );
        const imageDetails = response.data?.results[randomNumber2];
        setWallpaperDetails({wallpaperDetails:imageDetails});
        setWallpaperLink({wallpaperLink:imageDetails.urls.regular});
        // Store the image in local storage
      } catch (error) {
        setError(error.message);
      }
})

const wallpaperSlice = createSlice({
    name:"wallpaper",
    initialState:{wallpaperLink:"",setWallpaperDetails:null},
    reducers:{
        setWallpaperLink :(state,{payload})=>{
state.wallpaperLink= payload.wallpaperLink
        },
        setWallpaperDetails:(state,{payload})=>{
            state.setWallpaperDetails = payload.wallpaperDetails
        }
    }
})

export const {wallpaperLink} = wallpaperSlice.actions

export default wallpaperSlice.reducer

export const selectCurrentWallpaperLink = (state)=>state.wallpaper.wallpaperLink