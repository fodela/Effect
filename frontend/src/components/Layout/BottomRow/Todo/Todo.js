import { useEffect, useState } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem/TodoItem";
import useTasks from "../../../../hooks/useTasks";
import LoadingSpinner from "../../../Loading/LoadingSpinner";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../../../features/auth/authSlice";
import { selectCurrentAllTodos } from "../../../../features/todo/todoSlice";

const Todo = ({ isTodoOpen }) => {
  // Authentication or Permission
  const { accessToken } = useSelector(selectCurrentToken);
 

  // States
  const { tasks, setTasks } = useTasks();
  // const { allTodos, taskRequestError } = tasks;
  const {allTodos} = useSelector(selectCurrentAllTodos)
  console.log(allTodos, " :100:")

  const [isLoading, setIsLoading] = useState(false);

  // Get all the tasks from the backend
  // useEffect(() => {
  //   let isMounted = true;
  //   setIsLoading(true);
  //   const controller = new AbortController();

  //   // const fetchTodo = async () => {
  //   //   try {
  //   //     const res = await axiosPrivate.get("/tasks", {
  //   //       signal: controller.signal,
  //   //       headers: {
  //   //         "Content-Type": "application/json",
  //   //         Authorization: `Bearer ${accessToken}`,
  //   //       },
  //   //       withCredentials: true,
  //   //     });
  //   //     isMounted &&
  //   //       setTasks((prev) => {
  //   //         return {
  //   //           ...prev,
  //   //           allTodos: res.data?.tasks,
  //   //           taskRequestError: null,
  //   //         };
  //   //       });
  //   //   } catch (error) {
  //   //     setTasks((prev) => ({
  //   //       ...prev,
  //   //       allTodos: [],
  //   //       taskRequestError: error.response?.data?.msg,
  //   //     }));
  //   //   } finally {
  //   //     setIsLoading(false);
  //   //   }
  //   // };
  //   // fetchTodo();

  //   // clean up when component unmount
  //   return () => {
  //     setIsLoading(false);
  //     isMounted = false;
  //     // clean any leftover request
  //     controller.abort();
  //   };
  // }, [accessToken]);

  return (
    <div
      className={`bg-black bg-opacity-50 backdrop-blur-sm absolute bottom-8 right-0 w-80   rounded-md ${
        !isTodoOpen && "invisible"
      }
        
      `}
    >
      {isLoading && <LoadingSpinner />}
      <div className="todo-header p-4">Today</div>
      <div className="task-container max-h-[60vh] overflow-y-auto overflow-x-hidden p-4">
        {allTodos ? (
          allTodos.map((task) => <TodoItem key={task.id} task={task} />)
        ) : (
          <div className="text-red-400">
            {/* {taskRequestError} */}
          </div>
        )}
      </div>
      <NewTodo />
    </div>
  );
};

export default Todo;
