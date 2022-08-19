const addTodo = (event) => {
	if (event.keyCode === 13) {
		return { description: event.target.value.trim() };
	}
};
export default addTodo;
