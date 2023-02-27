import React, { useEffect, useRef, useState } from "react";
import useLocationApi from "../../../../hooks/useLocationApi";
// import dotenv from "dotenv";
// dotenv.config();
const API_KEY = "Z7BLjCA9DVKV1q2GQR9bjmNbZcvcH4a3";

const EditLocation = ({ onClose }) => {
  const [location, setLocation] = useState();
  const inputRef = useRef();
  useEffect(() => inputRef.current.focus());

  const searchLocation = () => {
    console.log(location, "Edit location 🧲");
    // if(location.length > 1){

    // }
  };

  return (
    <div className="absolute w-full top-0 left-0 right-0 bottom-0 bg-black opacity-75">
      <input
        ref={inputRef}
        className="outline-none bg-gray-600 opacity-50 text-2xl px-4 p-2 rounded-lg w-full z-50"
        placeholder="Type a location here"
        onBlur={onClose}
        onChange={(event) => {
          setLocation(event.target.value);

          searchLocation();
        }}
      />
    </div>
  );
};

export default EditLocation;
