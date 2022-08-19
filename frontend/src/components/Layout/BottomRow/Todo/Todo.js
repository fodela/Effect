import { useEffect, useState } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem/TodoItem";

let allDefaultTasks = [
	{ description: "Finish todo component", done: true },
	{ description: "Go and eat" },
	{ description: "Work on presentation slides" },
];

const Todo = () => {
	const [allTasks, setTasks] = useState(allDefaultTasks);

	const addTodoHandler = (event) => {
		if (event.keyCode === 13) {
			console.log("fired");
			allTasks.push({ description: event.target.value.trim() });
			console.log(allTasks);
			setTasks(allTasks);
		}
	};

	// const deleteTaskHandler = (taskIndex) => {
	// 	setTasks(allTasks.splice);
	// 	console.log("delete");
	// };
	let tasks;

	const todoItemClicked = () => console.log("this is it");
	// const updateUi = (allTasks) => {
	// 	return tasks;
	// };
	tasks = allTasks.map((task) => {
		return (
			<TodoItem
				onClick={todoItemClicked} // onClick={deleteTaskHandler}
				done={task.done}
				task={task.description}
				id={task.index}
			/>
		);
	});
	// useEffect(updateUi(), [allTasks]);
	// return (
	// 	<div className="bg-black bg-opacity-97 absolute bottom-8 right-0 w-80 p-4">
	// 		{tasks}
	// 		<NewTodo addTodo={addTodoHandler} />
	// 	</div>
	// );
};
export default Todo;
