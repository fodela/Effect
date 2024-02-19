import React, { useEffect, useState } from "react";

import styled from "styled-components";
import fetchWallpaper from "../../utils/fetchWallpaper";

const DEFAULT_WALLPAPER = "https://images.unsplash.com/photo-1476610182048-b716b8518aae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTQ2Nzd8MHwxfHNlYXJjaHwxNnx8d2FsbHBhcGVyJTIwbmF0dXJlfGVufDB8fHx8MTY3NzQ5MzExOA&ixlib=rb-4.0.3&q=80&w=1080"

const Layout = (props) => {
  const [wallpaper,setWallpaper] = useState("")
  const BoldWithImageBefore = styled.main`
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
      background-repeat: no-repeat;
      z-index: -10;
    }

  `;

  useEffect(() => {
  const getWallpaper = async ()=>{
    const {errorMessage, wallpaperLink} = await fetchWallpaper()
    if(errorMessage){
      setWallpaper(DEFAULT_WALLPAPER)
    }else{
      setWallpaper(wallpaperLink)
    }
  }
  getWallpaper()

  }, [])
  

 
  
    return <BoldWithImageBefore>{props.children}</BoldWithImageBefore>;
  


};

export default Layout;
