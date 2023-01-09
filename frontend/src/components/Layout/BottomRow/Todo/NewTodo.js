import { useRef, useState } from "react";
import axios from "../../../../api/axios";
import useAuth from "../../../../hooks/useAuth";
import useRefreshToken from "../../../../hooks/useRefreshToken";
import useTasks from "../../../../hooks/useTasks";

const NewTodo = (props) => {
  const inputRef = useRef();
  const [description, setDescription] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const { auth } = useAuth();
  const { access_token } = auth;

  const { setTasks } = useTasks();

  const refresh = useRefreshToken();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const controller = new AbortController();

    try {
      const res = await axios.post(
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
    } catch (error) {
      if (!error.response) {
        setErrMsg("Network Error!");
      } else if (error.response.data?.msg === "Token has expired") {
        refresh();
        handleSubmit();
      } else {
        console.log(error);
        setErrMsg(error.response?.request?.statusText);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {errMsg && <p className="text-red-300"> ⚠️Add todo error: {errMsg}</p>}
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
