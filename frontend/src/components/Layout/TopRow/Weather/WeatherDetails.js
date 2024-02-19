import React, { useEffect, useState, useContext } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { MdModeEditOutline } from "react-icons/md";

import { WeatherContext } from "../../../../context/weatherContext";
import Modal from "../../../Modal";
import EditLocation from "./EditLocation";

const WeatherDetails = ({ open }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const { weather } = useContext(WeatherContext);
  const {
    locationName,
    locationKey,
    locationKeyError,
    weatherDetails,
    weatherError,
  } = weather;

  const editLocationHandler = async () => {};

  if (locationKeyError) {
    return <div>LocationKeyError: {locationKeyError}</div>;
  }
  if (weatherError) {
    return <div>WeatherError: {weatherError}</div>;
  }
  if (weatherDetails) {
    return (
      <div
        className={`
       absolute top-6 right-1 w-[85vw] max-w-md`}
      >
        <div
          className="
              flex flex-col gap-2 bg-black/80 
              px-4 py-2 rounded-md  z-10 relative
              "
        >
          <p className="-mx-4 px-6  bg-[#494848ce] text-gray-400">
            {locationKeyError && locationKeyError}
            {weatherError && weatherError}
          </p>
          <div className="">
            {editLocation && (
              <EditLocation
                // open={editLocation}
                onClose={() => setEditLocation(false)}
              />
            )}
          </div>
          <header
            className={`flex justify-between items-center ${
              editLocation && "pt-8"
            }`}
          >
            <div>
              <div className="flex items-center">
                <p className="text-xl mx-1">{locationName}</p>
                <MdModeEditOutline
                  className="hover:bg-gray-800  rounded-md "
                  onClick={() => setEditLocation(!editLocation)}
                />
              </div>
              <p>{weatherDetails?.WeatherText}</p>
            </div>
            <div className="flex gap-5">
              <FiMoreHorizontal />
            </div>
          </header>
          <div className="flex items-center">
            <div className="text-5xl flex gap-4 flex-grow">
              <img
                alt=""
                src={
                  weatherDetails?.WeatherIcon &&
                  `https://developer.accuweather.com/sites/default/files/${weatherDetails?.WeatherIcon.toString().padStart(
                    2,
                    "0"
                  )}-s.png
                        `
                }
              />

              <h2 className="md:text-6xl">
                {Math.floor(weatherDetails?.Temperature.Metric.Value)}°
                {/* {weatherDetails.Temperature.Metric.Unit} */}
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

          {/* <section></section> */}
        </div>
      </div>
    );
  }
};

export default WeatherDetails;
