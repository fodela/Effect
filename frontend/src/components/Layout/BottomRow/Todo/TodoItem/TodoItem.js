const TodoItem = (props) => {
	const checkbox = props.done ? (
		<input type="checkbox" name="taskDone" id="taskDone" className="m-2" />
	) : (
		<input
			type="checkbox"
			name="taskDone"
			id="taskDone"
			className="m-2"
			onChange={() => console.log("done state changed")}
		/>
	);
	return (
		<span className="flex items-start ">
			{checkbox}
			<span className="task-description grow my-1">{props.task}</span>
			<div className="last more  opacity-0 hover:opacity-100 hover:pointer text-xl items-center">
				...
			</div>
		</span>
	);
};
export default TodoItem;
