import React from "react";

const TodoItemMenu = ({ deleteTask, setIsEditable }) => {
  return (
    <div className="absolute top-5 right-0 text-base rounded bg-gray-600 w-24 text-left p-2">
      <ol>
        <li onClick={() => setIsEditable(true)}>Edit</li>
        <li>Move to...</li>
        <li onClick={deleteTask}>Delete</li>
      </ol>
    </div>
  );
};

export default TodoItemMenu;
