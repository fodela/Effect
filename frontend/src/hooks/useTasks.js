import { useContext } from "react";
import TasksContext from "../context/TasksProvider";

const useTasks = () => useContext(TasksContext);

export default useTasks;
