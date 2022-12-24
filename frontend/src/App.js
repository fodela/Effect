// import React from "react";
import { useState } from "react";
import BottomRow from "./components/Layout/BottomRow/BottomRow";
import Layout from "./components/Layout/Layout";
import MainRegion from "./components/Layout/RegionCenter/MainRegion/MainRegion";
import QuoteRegion from "./components/Layout/RegionCenter/QuoteRegion/QuoteRegion";
import TopRow from "./components/Layout/TopRow/TopRow";
import { WeatherContext } from "./context/weatherContext";

import useLocationApi from "./hooks/useLocationApi";
import useWeatherApi from "./hooks/useWeatherApi";

const API_KEY = "Z7BLjCA9DVKV1q2GQR9bjmNbZcvcH4a3";

function App() {
  const [city, setCity] = useState("ho");
  const [locationName, locationKey, locationKeyError] = useLocationApi(
    API_KEY,
    city
  );
  const [weatherDetails, weatherError] = useWeatherApi(API_KEY, locationKey);

  return (
    <WeatherContext.Provider
      value={[
        locationName,
        locationKey,
        locationKeyError,
        weatherDetails,
        weatherError,
      ]}
    >
      <div>
        <Layout className=" relative">
          <div
            className="flex flex-col justify-start
				p-5
				h-[100vh]
				
				"
          >
            <TopRow />
            <div className="grow main "></div>
            <div className="region-main h-1/2 ">
              <MainRegion />
            </div>
            <QuoteRegion />
            <div className="grow"></div>
            <BottomRow />
          </div>
        </Layout>
      </div>
    </WeatherContext.Provider>
  );
}

export default App;
