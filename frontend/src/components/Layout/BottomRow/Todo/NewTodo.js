const NewTodo = (props) => {
	return (
		<input
			type="text"
			name="newTodo"
			id="newTodo"
			placeholder="New Todo"
			className="mx-auto w-10/12 pl-2 bg-black/10
			"
			onKeyUp={(event) => props.addTask(event)}
		/>
	);
};
export default NewTodo;
