import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem/TodoItem";

let allTasks = [
	"Finish todo component",
	"Go and eat",
	"Work on presentation slides",
];

const Todo = () => {
	const tasks = allTasks.map((task) => <TodoItem task={task} />);
	return (
		<div className="bg-black bg-opacity-97 absolute bottom-8 right-0 w-80 p-4">
			{tasks}
			<NewTodo />
		</div>
	);
};
export default Todo;
