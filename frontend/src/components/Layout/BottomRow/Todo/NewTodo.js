const NewTodo = () => {
	return (
		<input
			type="text"
			name="newTodo"
			id="newTodo"
			placeholder="New Todo"
			className="mx-auto m-5 pl-2 bg-black
			onKeyPress={console.log('it works'))}"
		/>
	);
};
export default NewTodo;
