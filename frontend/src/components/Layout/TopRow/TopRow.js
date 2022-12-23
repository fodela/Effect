import { useState } from "react";
import WeatherDetails from "./Weather/WeatherDetails";

const TopRow = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="region-top flex justify-between  place-items-center">
      <div className="logo h-12 w-12 bg-[#444] rounded-lg p-1">
        <img src="logo.png" alt="" />
      </div>

      <div className="sm:relative">
        <button
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
