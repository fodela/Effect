const NewTodo = (props) => {
	return (
		<input
			type="text"
			name="newTodo"
			id="newTodo"
			placeholder="New Todo"
			className="mx-auto  p-2 ml-4 bg-black/5 w-full rounded-md border-none
			"
			onKeyUp={(event) => props.addTask(event)}
		/>
	);
};
export default NewTodo;
