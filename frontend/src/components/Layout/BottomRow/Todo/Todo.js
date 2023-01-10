import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem/TodoItem";
import useAuth from "../../../../hooks/useAuth";
import { axiosPrivate } from "../../../../api/axios";
import useRefreshToken from "../../../../hooks/useRefreshToken";
import useTasks from "../../../../hooks/useTasks";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../Loading/LoadingSpinner";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const Todo = ({ isTodoOpen }) => {
  // Authentication or Permission
  const { auth } = useAuth();
  const { access_token } = auth;
  const axiosPrivate = useAxiosPrivate();

  // States
  const { tasks, setTasks } = useTasks();
  const { allTasks, taskRequestError } = tasks;

  const [isLoading, setIsLoading] = useState(false);

  // Get all the tasks from the backend
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    const controller = new AbortController();

    const fetchTodo = async () => {
      try {
        const res = await axiosPrivate.get("/tasks", {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          withCredentials: true,
        });
        isMounted &&
          setTasks((prev) => {
            return {
              ...prev,
              allTasks: res.data?.tasks,
              taskRequestError: null,
            };
          });
        setIsLoading(false);
      } catch (error) {
        setTasks((prev) => ({
          ...prev,
          allTasks: [],
          taskRequestError: error.response?.data?.msg,
        }));
        setIsLoading(false);
      }
    };
    fetchTodo();

    // clean up when component unmount
    return () => {
      setIsLoading(false);
      isMounted = false;
      // clean any leftover request
      controller.abort();
    };
  }, [access_token]);

  return (
    <div
      className={`bg-black bg-opacity-70 absolute bottom-8 right-0 w-80   rounded-md ${
        isTodoOpen && "invisible"
      }`}
    >
      {isLoading && <LoadingSpinner />}
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
