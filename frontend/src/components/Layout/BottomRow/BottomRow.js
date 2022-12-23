import { useState } from "react";
import Todo from "./Todo/Todo";

const BottomRow = () => {
  const [todoState, setTodoState] = useState("hidden");

  const showStateHandler = () => {
    console.log("todoStateHandled");
    if (todoState === "visible") {
      setTodoState("hidden");
      console.log("hidden");
    } else {
      setTodoState("visible");
      console.log("visible");
    }
    return todoState;
  };

  return (
    <div className="flex justify-between ">
      <div className="bottom-left flex gap-2 relative">
        <div className="bgShadow" />
        <i>Se-I</i>
        <p>image info</p>
      </div>
      <div className="bottom-right relative">
        <div className="bgShadow" />
        <button onClick={showStateHandler}>Todo</button>
        <Todo todoState={todoState} />
      </div>
    </div>
  );
};
export default BottomRow;
