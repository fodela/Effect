import { useEffect, useRef, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdModeEditOutline } from "react-icons/md";

import React from "react";
import useWeatherApi from "../../../../hooks/useWeatherApi";
import useLocationApi from "../../../../hooks/useLocationApi";

const sampleWeather = {
  city: "Ho",
  desc: "Partly sunny",
  icon: "C",
  temp: "31",
  feelsLike: "39",
  rain: "0",
  wind: "6",
};

const API_KEY = "Z7BLjCA9DVKV1q2GQR9bjmNbZcvcH4a3";

const WeatherDetails = ({ open }) => {
  const [city, setCity] = useState("vancouver");
  // const [locationName, locationKey, locationKeyError] = useLocationApi(
  //   API_KEY,
  //   city
  const [locationName, locationKey, locationKeyError] = useState();
  // const [weatherDetails, weatherError] = useWeatherApi(API_KEY, locationKey);
  const [weatherDetails, weatherError] = useState("");
  const [isOpen, setIsOpen] = useState(open);
  const weatherRef = useRef();
  let props = { tabIndex: 0 };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  if (locationKeyError) {
    return <div>LocationKeyError: {locationKeyError}</div>;
  }
  if (weatherError) {
    return <div>WeatherError: {weatherError}</div>;
  }
  if (weatherDetails) {
    return (
      <div className={`${!isOpen && "invisible"}`}>
        <div
          className="
      flex flex-col gap-2 bg-black/80 absolute top-6 right-1 w-[85vw] max-w-md
      px-4 py-2 rounded-md 
      "
        >
          <p className="-mx-4 px-6  bg-[#494848ce] text-gray-400">
            {locationKeyError && locationKeyError}
            {weatherError && weatherError}
          </p>
          <header className="flex justify-between items-center">
            <div>
              <div className="flex items-center">
                <p className="text-xl ">{locationName}</p>
                <MdModeEditOutline />
              </div>
              <p>{weatherDetails.WeatherText}</p>
            </div>
            <div className="flex gap-5">
              <FiMoreHorizontal />
            </div>
          </header>
          <div className="flex items-center">
            <div className="text-6xl flex gap-4 flex-grow">
              <img
                src={`https://developer.accuweather.com/sites/default/files/${weatherDetails.WeatherIcon}-s.png`}
              />

              <h2>
                {Math.floor(weatherDetails.Temperature.Metric.Value)}°
                {weatherDetails.Temperature.Metric.Unit}
              </h2>
            </div>
            <div className="text-gray-400 flex-grow">
              <p>See Details &darr;</p>
              <a href="http://www.accuweather.com/en/gh/ho/181677/current-weather/181677?lang=en-us">
                Mobile link 📱
              </a>
              <br />
              <a href="http://www.accuweather.com/en/gh/ho/181677/current-weather/181677?lang=en-us">
                Web link 💻
              </a>
            </div>
          </div>

          <a href="https://www.accuweather.com/" className="text-xs text-right">
            <strong>Accuweather</strong> more weather &rarr;
          </a>

          <section></section>
        </div>
        <div></div>
      </div>
    );
  }
};

export default WeatherDetails;
