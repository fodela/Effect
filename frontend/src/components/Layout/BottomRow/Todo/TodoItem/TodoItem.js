import { useState } from "react";
import axios from "../../../../../api/axios";
import useAuth from "../../../../../hooks/useAuth";
import useRefreshToken from "../../../../../hooks/useRefreshToken";
import useTasks from "../../../../../hooks/useTasks";

const TodoItem = ({ task }) => {
  const [errMsg, setErrMsg] = useState(null);
  const { auth } = useAuth();
  const { access_token } = auth;
  const refresh = useRefreshToken();
  const { setTasks } = useTasks();

  // functions or Methods
  const handleDoneTodo = async () => {
    console.log(task.task_state?.is_completed);
    try {
      const res = await axios.patch(
        `/tasks/${task.id}`,
        { ...task, is_completed: !task.task_state.is_completed },
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
      } else if (error.response.data?.msg === "Token has expired") {
        console.log(" 👍 💯 👎");
        refresh();
        handleDoneTodo();
      } else {
        console.log(error);
        setErrMsg(error.response?.request?.statusText);
      }
    }
  };

  const handleDeleteTask = async () => {
    try {
      const res = await axios.delete(`/tasks/${task.id}`, {
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
      } else if (error.response.data?.msg === "Token has expired") {
        console.log(" 👍 💯 👎");
        refresh();
        handleDoneTodo();
      } else {
        console.log(error);
        setErrMsg(error.response?.request?.statusText);
      }
    }
  };

  // Return
  return (
    <div className="flex items-start group justify-between" key={task.id}>
      <div>
        <input
          checked={task.task_state?.is_completed}
          // onChange={handleDoneTodo}
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
