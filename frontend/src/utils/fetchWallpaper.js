import axios from "../app/api/axios"
const apiKey = "ssxRTObTWUTsTNRA4FCR6sUIeznLzrtbwT6JkUzWZLA";

const fetchWallpaperLink = async ()=>{
    try {
        // check if the  image is already stored in local storage
        const storedImageUrl = localStorage.getItem("wallpaper_image_url");
        if (storedImageUrl) {
        //   setWallpaperLink(storedImageUrl)
          return {errorMessage:"",wallpaperLink:storedImageUrl};
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

        // setWallpaperDetails({wallpaperDetails:imageDetails});
        // setWallpaperLink({wallpaperLink:imageDetails.urls.regular});
        return {errorMessage:"",wallpaperLink:imageDetails.urls.regular}
        // Store the image in local storage
      } catch (error) {
        return {errorMessage:error?.message,wallpaperLink:""}
      }
}

export default fetchWallpaperLink