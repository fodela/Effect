import {useState } from "react";
import {FiEdit3,FiTrash} from "react-icons/fi"
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import useRefreshToken from "../../../../../hooks/useRefreshToken";
import useTasks from "../../../../../hooks/useTasks";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../../../../features/auth/authSlice";

const TodoItem = ({ task }) => {
  const [errMsg, setErrMsg] = useState(null);
  const { accessToken } = useSelector(selectCurrentToken);
  const axiosPrivate = useAxiosPrivate();
  const { setTasks } = useTasks();
  const [isTaskDone, setIsTaskDone] = useState(task.task_state?.is_completed);
  const [isEditable, setIsEditable] = useState(false);
  const [newDescription,setNewDescription] = useState(task.description)

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
            Authorization: `Bearer ${accessToken}`,
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

  const handleEditTodo = async (e) =>{
    e.preventDefault()
    try {
      const res = await axiosPrivate.patch(
        `/tasks/${task.id}`,
        { ...task, description: newDescription },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
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
    }finally{
      setIsEditable(false)
    }
  }

  const handleDeleteTask = async () => {
    try {
      const res = await axiosPrivate.delete(`/tasks/${task.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
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
    <div className="flex group justify-between animation-reveal-up items-center">
      <div className="flex gap-1">
        <input
          checked={isTaskDone}
          onChange={handleDoneTodo}
          type="checkbox"
          name="taskDone"
          id="taskDone"
          className="m-2"
        />
       { isEditable?
        <form onSubmit={(e)=>handleEditTodo(e)}>
        <input
          className="bg-inherit border-b-2 outline-none"
          type="text"
          value={newDescription}
          autoFocus
          onBlur={(e)=>handleEditTodo(e)}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      </form>
      :
        <div
          className={
            `task-description my-1 outline-none ${
              isTaskDone && "text-white/50 line-through"
            }`
          }
          onDoubleClick={() => setIsEditable(true)}
        >
          {task.description}
        </div>}
      </div>
      <div
        className="invisible hover:cursor-pointer  group-hover:visible"
      >
        <div
          className="flex gap-1"
        >
          <FiEdit3 size={20} onClick={()=>setIsEditable(true)}/>
          <FiTrash size={20} onClick={handleDeleteTask}/>
          
      
        </div>
      </div>
    </div>
  );
};
export default TodoItem;
