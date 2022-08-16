import TodoItem from "./TodoItem/TodoItem";

const Todo = () => {
	return (
		<div className="bg-black absolute bottom-8 right-0 w-80">
			<TodoItem task={"Finish todo component"} />
			<TodoItem task={"Go and eat"} />
			<TodoItem task={"Work on presentation slides"} />
		</div>
	);
};
export default Todo;
