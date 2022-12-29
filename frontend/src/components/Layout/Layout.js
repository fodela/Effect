import React from "react";
import useWallpaper from "../../hooks/useWallpaper";
const apiKey = "ssxRTObTWUTsTNRA4FCR6sUIeznLzrtbwT6JkUzWZLA";
const Layout = (props) => {
  const [wallpaper] = useWallpaper(apiKey);

  return (
    <div
      className="h-screen relative  bg-cover  bg-center "
      style={{ backgroundImage: `url(${wallpaper})` }}
    >
      {props.children}
    </div>
  );
};

export default Layout;
