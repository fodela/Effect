import React from "react";

const TodoItemMenu = () => {
  return (
    <div className="absolute top-5 right-0 text-base rounded bg-gray-600 w-24 text-left p-2">
      <ol>
        <li>Edit</li>
        <li>Move to...</li>
        <li>Delete</li>
      </ol>
    </div>
  );
};

export default TodoItemMenu;
