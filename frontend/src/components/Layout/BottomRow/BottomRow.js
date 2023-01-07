import { useState } from "react";
import Todo from "./Todo/Todo";
import { FiSettings } from "react-icons/fi";

const BottomRow = () => {
  const [isTodoOpen, setIsTodoOpen] = useState(false);

  return (
    <div className="flex justify-between ">
      <div className="bottom-left flex items-center gap-2 relative">
        <div className="bgShadow" />
        <FiSettings />
        <p>image info</p>
      </div>
      <div className="bottom-right relative">
        <div className="bgShadow" />
        <button onClick={() => setIsTodoOpen(!isTodoOpen)}>Todo</button>
        <Todo isTodoOpen={isTodoOpen} />
      </div>
    </div>
  );
};
export default BottomRow;
