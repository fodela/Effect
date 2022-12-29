import { useEffect, useState } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem/TodoItem";
import useAuth from "../../../../hooks/useAuth";
import axios from "../../../../api/axios";
const Todo = () => {
  const [allTasks, setAllTasks] = useState(null);
  const [taskRequestError, setTaskRequestError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { access_token } = useAuth();

  useEffect(() => {
    const fetchTodo = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/tasks", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        setAllTasks(res.data?.tasks);
        setIsLoading(false);
      } catch (error) {
        if (!error?.response) {
          setTaskRequestError("Network error");
        } else {
          console.log(" 👽: ", error.response?.request?.statusText);
          setTaskRequestError(error.response?.request?.statusText);
        }
      }
    };
    fetchTodo();
  });

  const changeTodoStateHandler = (taskIndex) => {
    //     const allTasks = [...state.allTasks];
    //     allTasks[taskIndex].done = allTasks[taskIndex].done ? false : true;
    //     allTasks[taskIndex].todoClass = allTasks[taskIndex].done
    //       ? "text-white/50 line-through"
    //       : "";
    //     setState({ allTasks: allTasks });
    //     console.log();
  };

  const addTaskHandler = (event) => {
    //     if (event.keyCode === 13) {
    //       const taskDescription = event.target.value.trim();
    //       const allTasks = [...state.allTasks];
    //       if (event.target.value !== "") {
    //         allTasks.push({ description: taskDescription });
    //         setState({ allTasks: allTasks });
    //         event.target.value = "";
    //       }
    //       console.log("task added");
    //     }
  };

  const deleteTaskHandler = (taskIndex) => {
    //     const allTasks = [...state.allTasks];
    //     allTasks.splice(taskIndex, 1);
    //     setState({ allTasks: allTasks });
    //     console.log(taskIndex, " deleted");
  };

  return (
    <div
      className={
        "bg-black bg-opacity-70 absolute bottom-8 right-0 w-80   rounded-md"
      }
    >
      <div className="todo-header p-4">Today</div>
      <div className="task-container max-h-[60vh] overflow-y-auto p-4">
        {allTasks ? (
          allTasks.map((task) => <TodoItem task={task} />)
        ) : (
          <div>👎{taskRequestError}</div>
        )}
      </div>
      <NewTodo addTask={addTaskHandler} />
    </div>
  );
};

export default Todo;
