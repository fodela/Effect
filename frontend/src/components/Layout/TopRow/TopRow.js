import { useState } from "react";
import WeatherDetails from "./Weather/WeatherDetails";

const TopRow = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="region-top flex justify-between  place-items-center ">
      <div className=""></div>

      <div className="sm:relative relative ">
        <div className="bgShadow" />
        <button
          className="relative"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Weather
        </button>
        <WeatherDetails open={isOpen} />
      </div>
    </div>
  );
};
export default TopRow;
