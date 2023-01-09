import React from "react";

const Draggable = ({ children }) => {
  const dragStart = () => {
    console.log("started drag");
  };
  const drag = () => {
    console.log("dragging");
  };
  const dragEnd = () => {
    console.log("ended drag");
  };
  return <div onDragStart={dragStart}>{children}</div>;
};

export default Draggable;
