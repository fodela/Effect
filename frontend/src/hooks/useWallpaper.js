import { useContext, useEffect, useState } from "react";
import axios from "axios";
import WallpaperContext from "../context/WallpaperProvider";
// wallpaperContext
const useWallpaper = (apiKey) => {
  const { setWallpaperDetails } = useContext(WallpaperContext);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewWallpaper = async () => {
      try {
        // check if the  image is already stored in local storage
        const storedImageUrl = localStorage.getItem("wallpaper_image_url");
        if (storedImageUrl) {
          setImageUrl(storedImageUrl);
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
        setWallpaperDetails(imageDetails);
        setImageUrl(imageDetails.urls.regular);
        // Store the image in local storage
      } catch (error) {
        setError(error.message);
      }
    };

    fetchNewWallpaper();
    // Fetch a new wallpaper every day at 12:00 am
    // const schedule = "0 0 * * *";
    // const cron = require("node-cron");
    // cron.schedule(schedule, fetchNewWallpaper);
  }, [apiKey]);

  return [imageUrl, error];
};

export default useWallpaper;
