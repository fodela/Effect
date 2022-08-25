const TodoItem = (props) => {
	let todoClass;

	// task = props.done ? (
	// 	<Fragment>
	// 		<input
	// 			type="checkbox"
	// 			name="taskDone"
	// 			id="taskDone"
	// 			checked
	// 			className="m-2"
	// 			onChange={props.changeTodoState}
	// 		/>

	// 		<span className="task-description grow my-1 line-through text-[#eee6]">
	// 			{props.task}
	// 		</span>
	// 	</Fragment>
	// ) : (
	// 	<Fragment>
	// 		<input
	// 			type="checkbox"
	// 			name="taskDone"
	// 			id="taskDone"
	// 			className="m-2"
	// 			onChange={props.changeTodoState}
	// 		/>

	// 		<span className="task-description grow my-1">{props.task}</span>
	// 	</Fragment>
	// );

	return (
		<div className="flex items-start group justify-between">
			<div>
				<input
					checked={props.task.done}
					type="checkbox"
					name="taskDone"
					id="taskDone"
					className="m-2"
					onChange={props.changeTodoState}
				/>
				<span className={"task-description my-1 " + props.task.todoClass}>
					{props.task.description}
				</span>
			</div>
			<div
				className="last more invisible hover:cursor-pointer  group-hover:visible text-2xl  items-center "
				onClick={props.deleteTask}
			>
				...
			</div>
		</div>
	);
};
export default TodoItem;
