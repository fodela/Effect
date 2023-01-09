import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem/TodoItem";
import useAuth from "../../../../hooks/useAuth";
import axios from "../../../../api/axios";
import useRefreshToken from "../../../../hooks/useRefreshToken";
import Draggable from "../../../Draggable/Draggable";
import useGetTasks from "../../../../hooks/useGetTasks";
import useTasks from "../../../../hooks/useTasks";
import { useEffect } from "react";

const Todo = ({ isTodoOpen }) => {
  const getTasks = useGetTasks();
  const { tasks } = useTasks();
  const { allTasks, taskRequestError } = tasks;

  // Get all the tasks from the backend
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div
      className={`bg-black bg-opacity-70 absolute bottom-8 right-0 w-80   rounded-md ${
        isTodoOpen && "invisible"
      }`}
    >
      <div className="todo-header p-4">Today</div>
      <div className="task-container max-h-[60vh] overflow-y-auto p-4">
        {allTasks ? (
          allTasks.map((task) => <TodoItem key={task.id} task={task} />)
        ) : (
          <div className="text-red-400">{taskRequestError}</div>
        )}
      </div>
      <NewTodo />
    </div>
  );
};

export default Todo;
