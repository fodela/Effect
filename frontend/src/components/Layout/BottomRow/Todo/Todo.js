import { useState } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem/TodoItem";

let allDefaultTasks = [
	{ description: "Finish todo component", done: true },
	{ description: "Go and eat" },
	{ description: "Work on presentation slides" },
];

const Todo = () => {
	const [allTasks, setTasks] = useState(allDefaultTasks);
	const deleteTaskHandler = (taskIndex) => {
		setTasks(allTasks.splice);
		console.log("delete");
	};
	let tasks;

	tasks = allTasks.map((task) => {
		return (
			<TodoItem
				click={deleteTaskHandler}
				done={task.done}
				task={task.description}
			/>
		);
	});
	return (
		<div className="bg-black bg-opacity-97 absolute bottom-8 right-0 w-80 p-4">
			{tasks}
			<NewTodo />
		</div>
	);
};
export default Todo;
