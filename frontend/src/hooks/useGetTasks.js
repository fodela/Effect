import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import axios from "../api/axios";
import useTasks from "./useTasks";

const useGetTasks = () => {
  // States
  const [taskRequestError, setTaskRequestError] = useState("");
  const { setTasks } = useTasks();

  // Authentication or Permission
  const { auth } = useAuth();
  const { access_token } = auth;
  const refresh = useRefreshToken();

  // useEffect(() => {
  const controller = new AbortController();

  const fetchTodo = async () => {
    try {
      const res = await axios.get("/tasks", {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        withCredentials: true,
      });
      setTasks((prev) => {
        return { ...prev, allTasks: res.data?.tasks, taskRequestError: null };
      });
    } catch (error) {
      setTasks((prev) => ({
        ...prev,
        allTasks: [],
        taskRequestError: error.response?.request?.statusText,
      }));
      if (!error?.response) {
      } else if (error.response.data?.msg === "Token has expired") {
        console.log(" 👍 💯 👎");
        refresh();
        fetchTodo();
      }
    }
  };
  // fetchTodo();

  //   // clean up when component unmount
  //   return () => {
  //     isMounted = false;
  //     // clean any leftover request
  //     controller.abort();
  //   };
  // }, [access_token]);

  return fetchTodo;
};

export default useGetTasks;
