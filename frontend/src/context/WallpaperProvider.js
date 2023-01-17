import React, { createContext, useState } from "react";

const WallpaperContext = createContext({});

export const WallpaperProvider = ({ children }) => {
  const [wallpaperDetails, setWallpaperDetails] = useState({});
  return (
    <WallpaperContext.Provider
      value={{ wallpaperDetails, setWallpaperDetails }}
    >
      {children}
    </WallpaperContext.Provider>
  );
};

export default WallpaperContext;
