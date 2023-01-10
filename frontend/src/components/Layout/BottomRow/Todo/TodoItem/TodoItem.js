import { useState } from "react";
import { axiosPrivate } from "../../../../../api/axios";
import useAuth from "../../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import useRefreshToken from "../../../../../hooks/useRefreshToken";
import useTasks from "../../../../../hooks/useTasks";

const TodoItem = ({ task }) => {
  const [errMsg, setErrMsg] = useState(null);
  const { auth } = useAuth();
  const { access_token } = auth;
  const axiosPrivate = useAxiosPrivate();
  const { setTasks } = useTasks();
  const [isTaskDone, setIsTaskDone] = useState(task.task_state?.is_completed);

  // functions or Methods
  const handleDoneTodo = async () => {
    setIsTaskDone(!isTaskDone);
    try {
      const res = await axiosPrivate.patch(
        `/tasks/${task.id}`,
        { ...task, is_completed: isTaskDone },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          withCredentials: true,
        }
      );
      setTasks((prev) => ({ ...prev, allTasks: res.data?.tasks }));
    } catch (error) {
      if (!error.response) {
        setErrMsg("Network Error!");
      } else {
        console.log(error);
        setErrMsg(error.response.data?.msg);
      }
    }
  };

  const handleDeleteTask = async () => {
    try {
      const res = await axiosPrivate.delete(`/tasks/${task.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        withCredentials: true,
      });
      setTasks((prev) => ({ ...prev, allTasks: res.data?.tasks }));
    } catch (error) {
      if (!error.response) {
        setErrMsg("Network Error!");
      } else {
        console.log(error);
        setErrMsg(error.response.data?.msg);
      }
    }
  };

  // Return
  return (
    <div className="flex items-start group justify-between">
      <div>
        <input
          checked={isTaskDone}
          onChange={handleDoneTodo}
          type="checkbox"
          name="taskDone"
          id="taskDone"
          className="m-2"
        />
        <span className={"task-description my-1 " + task.todoClass}>
          {task.description}
        </span>
      </div>
      <div
        className="last more invisible hover:cursor-pointer  group-hover:visible text-2xl  items-center "
        // onClick={deleteTask}
      >
        <button onClick={handleDeleteTask}>...</button>
      </div>
    </div>
  );
};
export default TodoItem;
