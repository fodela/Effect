const NewTodo = (props) => {
	return (
		<input
			type="text"
			name="newTodo"
			id="newTodo"
			placeholder="New Todo"
			className="mx-auto  pl-2 bg-black/5 w-full
			"
			onKeyUp={(event) => props.addTask(event)}
		/>
	);
};
export default NewTodo;
