import { useState, useMemo } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdModeEditOutline } from "react-icons/md";

import React from "react";

const sampleWeather = {
  city: "Ho",
  desc: "Partly sunny",
  icon: "C",
  temp: "31",
  feelsLike: "39",
  rain: "0",
  wind: "6",
};

const WeatherDetails = () => {
  const [weatherDetails, setWeatherDetails] = useState(sampleWeather);
  const [isErr, setIsErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  return (
    <div>
      <div
        className="
      flex flex-col gap-2 bg-black/80 absolute top-1 right-1 w-[85vw] max-w-md
      px-4 py-2 rounded-md 
      "
      >
        <p className="-mx-4 px-6  bg-[#494848ce] text-gray-400">
          {isErr && errMsg}
        </p>
        <header className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <p className="text-xl ">{weatherDetails.city}</p>
              <MdModeEditOutline />
            </div>
            <p>{weatherDetails.desc}</p>
          </div>
          <div className="flex gap-5">
            <FiMoreHorizontal />
          </div>
        </header>
        <div className="flex items-center">
          <div className="text-6xl flex gap-4 flex-grow">
            <i>{weatherDetails.icon}</i>
            <h2>{weatherDetails.temp}°</h2>
          </div>
          <div className="text-gray-400 flex-grow">
            <p>
              Feels like{" "}
              <span className="text-white">{weatherDetails.feelsLike} °</span>
            </p>
            <p>
              Recent rain{" "}
              <span className="text-white">{weatherDetails.rain} mm</span>
            </p>
            <p>
              Wind{" "}
              <span className="text-white">{weatherDetails.wind} km/h</span>
            </p>
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
};

export default WeatherDetails;
