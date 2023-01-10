import { useRef, useState } from "react";
import { axiosPrivate } from "../../../../api/axios";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import useRefreshToken from "../../../../hooks/useRefreshToken";
import useTasks from "../../../../hooks/useTasks";
import LoadingSpinner from "../../../Loading/LoadingSpinner";

const NewTodo = (props) => {
  const inputRef = useRef();
  const [description, setDescription] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();
  const { access_token } = auth;

  const { setTasks } = useTasks();

  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const controller = new AbortController();

    try {
      const res = await axiosPrivate.post(
        "/tasks",
        { description },
        {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          withCredentials: true,
        }
      );
      setTasks((prev) => ({ ...prev, allTasks: res.data?.tasks }));
      inputRef.current.value = "";
      setErrMsg(null);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (!error.response) {
        setErrMsg("Network Error!");
      } else {
        console.log(error);
        setErrMsg(error.response?.data?.msg);
      }
    }
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
        className="p-2 ml-4 bg-inherit  rounded-md outline-none
			"
      />
    </form>
  );
};
export default NewTodo;
