const TodoItem = ({ task }) => {
	return (
		<span className="flex items-start ">
			<input type="checkbox" name="taskDone" id="taskDone" className="m-2" />
			<span className="task-description grow my-1">{task}</span>
			<div className="last more mx-4 opacity-0 hover:opacity-100 hover:pointer text-xl items-center">
				...
			</div>
		</span>
	);
};
export default TodoItem;
