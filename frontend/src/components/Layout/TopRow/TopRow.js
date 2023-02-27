import { useContext, useState, useEffect } from "react";
import { WeatherContext } from "../../../context/weatherContext";
import WeatherDetails from "./Weather/WeatherDetails";
import useLocationApi from "../../../hooks/useLocationApi";
import useWeatherApi from "../../../hooks/useWeatherApi";
// import dotenv from "dotenv";
// dotenv.config();
const API_KEY = "Z7BLjCA9DVKV1q2GQR9bjmNbZcvcH4a3";

const TopRow = () => {
  const [isWeatherOpen, setIsWeatherOpen] = useState(false);

  const { locationName, locationKey, locationKeyError } = useLocationApi(
    API_KEY,
    "Ho"
  );
  const [weatherDetails, weatherError] = useWeatherApi(API_KEY, locationKey);

  const { setWeather } = useContext(WeatherContext);

  useEffect(() => {
    setWeather({
      locationName,
      locationKey,
      locationKeyError,
      weatherDetails,
      weatherError,
    });
  }, [locationName, locationKey, locationKey, weatherDetails, weatherError]);

  return (
    <>
      {weatherError ? (
        <div>{weatherError}</div>
      ) : (
        <div className="region-top flex justify-between  place-items-center ">
          <div className=""></div>

          <div className="sm:relative relative ">
            <div className="bgShadow" />
            <div
              className="relative cursor-pointer"
              onClick={() => {
                setIsWeatherOpen(!isWeatherOpen);
              }}
            >
              <div className="flex flex-col items-end">
                <div className=" flex items-center">
                  <img
                    className="h-10 w-10"
                    alt=""
                    src={`https://developer.accuweather.com/sites/default/files/${weatherDetails?.WeatherIcon.toString().padStart(
                      2,
                      "0"
                    )}-s.png
                      `}
                  />

                  <h2 className="text-2xl">
                    {weatherDetails?.Temperature.Metric.Value &&
                      Math.floor(weatherDetails?.Temperature.Metric.Value)}
                    °
                  </h2>
                </div>
                <p>{locationName}</p>
              </div>
            </div>

            {isWeatherOpen && <WeatherDetails />}
          </div>
        </div>
      )}{" "}
    </>
  );
};
export default TopRow;
