import React from "react";
import useWallpaper from "../../hooks/useWallpaper";

import styled from "styled-components";

const apiKey = "ssxRTObTWUTsTNRA4FCR6sUIeznLzrtbwT6JkUzWZLA";
const Layout = (props) => {
  const [wallpaper] = useWallpaper(apiKey);
  const BoldWithImageBefore = styled.div`
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url(${wallpaper});
      background-size: cover;
      background-position: center;
      z-index: -10;
    }
  `;
  if (wallpaper) {
    // const image = wallpaper.toString();
    // alert(image);
    console.log(wallpaper);
    return <BoldWithImageBefore>{props.children}</BoldWithImageBefore>;
  }

  return (
    <div
      className={`before:absolute before:top-0 before:right-0 before:left-0 before:bottom-0 relative before:bg-[url(https://images.unsplash.com/photo-1476610182048-b716b8518aae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTQ2Nzd8MHwxfHNlYXJjaHwxNnx8d2FsbHBhcGVyJTIwbmF0dXJlfGVufDB8fHx8MTY3NzQ5MzExOA&ixlib=rb-4.0.3&q=80&w=1080)] before:-z-10`}
    >
      {props.children}
    </div>
  );
};

export default Layout;
