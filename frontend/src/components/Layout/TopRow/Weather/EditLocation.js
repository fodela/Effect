import React, { useEffect, useRef } from "react";

const EditLocation = ({ onClose }) => {
  const inputRef = useRef();
  useEffect(() => inputRef.current.focus());
  return (
    <div className="absolute w-full top-0 left-0 right-0 bottom-0 bg-black opacity-75">
      <input
        ref={inputRef}
        className="outline-none bg-gray-600 opacity-50 text-2xl px-4 p-2 rounded-lg w-full z-50"
        placeholder="Type a location here"
        onBlur={onClose}
      />
    </div>
  );
};

export default EditLocation;
