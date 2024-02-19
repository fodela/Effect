import { useRef, useState } from "react";
import useTasks from "../../../../hooks/useTasks";
import LoadingSpinner from "../../../Loading/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "../../../../features/auth/authSlice";
import { axiosPrivate } from "../../../../app/api/axios";
import { postAdded } from "../../../../features/todo/todoSlice";

const NewTodo = (props) => {
  const inputRef = useRef();
  const [description, setDescription] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const accessToken  = useSelector(selectCurrentToken)

  const { setTasks } = useTasks();
  const dispacth = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault();
    description && dispacth(postAdded(description))
    // setIsLoading(true);
    // const controller = new AbortController();
    // console.log(accessToken)

    // try {
    //   const res = await axiosPrivate.post(
    //     "/tasks",
    //     { description },
    //     {
    //       signal: controller.signal,
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //       withCredentials: true,
    //     }
    //   );
    //   setTasks((prev) => ({ ...prev, allTasks: res.data?.tasks }));
    //   inputRef.current.value = "";
    //   setErrMsg(null);
    // } catch (error) {
    //   if (!error.response) {
    //     setErrMsg("Network Error!");
    //   } else {
    //     console.log(error);
    //     setErrMsg(error.response?.data?.msg);
    //   }
    // } finally {
    //   setIsLoading(false);
    // }
  };
  return (
    <form onSubmit={handleSubmit}>
      {errMsg && <p className="text-red-300"> ⚠️Add todo error: {errMsg}</p>}
      {isLoading && <LoadingSpinner />}
      <input
        type="text"
        ref={inputRef}
        onChange={(event) => setDescription(event.target.value.trim())}
        placeholder="New Todo"
        className="p-2 ml-4 bg-inherit  rounded-md outline-none w-11/12"
      />
    </form>
  );
};
export default NewTodo;
