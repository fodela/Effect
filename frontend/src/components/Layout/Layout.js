// import getAllWallpapers from "../../utils/getWallpapersDetails";
import { useState, useEffect } from "react";
import { createApi } from "unsplash-js";

const MILLISECONDS_IN_A_DAY = 86400000;

const { REACT_APP_UNSPLASH_ACCESS_KEY } = process.env;

const unsplashApi = createApi({
  accessKey: REACT_APP_UNSPLASH_ACCESS_KEY,
});

let wallpaper =
  "https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?ixid=MnwzNTQ2Nzd8MHwxfHNlYXJjaHwyfHxtb3VudGFpbiUyMHdhbGxwYXBlcnxlbnwwfHx8fDE2NjEzODMwMzU&ixlib=rb-1.2.1";

const Layout = (props) => {
  let [day, setDay] = useState(1);

  let storedWallpapers = localStorage.getItem("allWallpapers");

  const getAllWallpapers = () => {
    unsplashApi.search
      .getPhotos({
        query: "mountain wallpaper",
        collections: "wallpaper",
        per_page: 30,
      })
      .then((result) => {
        localStorage.allWallpapers = JSON.stringify(result.response.results);
      })
      .catch((error) => {
        console.log(`Something went wrong \n${error}`);
      });
  };

  useEffect(() => {
    const wallPaperInterval = setInterval(() => {
      const newDay = day < 29 ? day + 1 : 0;
      console.log(newDay);
      setDay(newDay);
      console.log("day changed", day);
    }, MILLISECONDS_IN_A_DAY);
    if (storedWallpapers && day < 30) {
      // day;

      wallpaper = JSON.parse(localStorage.allWallpapers)[day].urls.raw;
    } else {
      getAllWallpapers();

      wallpaper = JSON.parse(localStorage.allWallpapers)[
        day
      ].urls.raw.toString();
    }
    return () => clearInterval(wallPaperInterval);
  }, [day, storedWallpapers]);

  return (
    <div
      className="h-screen"
      //   style={{ backgroundImage: `url(${wallpaper})` }}
    >
      {props.children}
    </div>
  );
};

export default Layout;
