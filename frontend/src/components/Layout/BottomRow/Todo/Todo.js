import { Component } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem/TodoItem";

// class Todo extends Component {
// 	state(
//
// 		)

// 	// addTodoHandler = (event) => (
// 	// 	console.log("addTodoHandler")
// 	// 	// if (event.keyCode === 13) {
// 	// 	// 	allTasks.push({ description: event.target.value.trim() });
// 	// 	// 	setTasks(allTasks);
// 	// 	// }
// 	// 	)

// 	// deleteTaskHandler = (taskIndex) => {
// 	// 	allTasks.splice(taskIndex, 1);
// 	// 	setTasks(allTasks);
// 	// 	console.log(taskIndex, " deleted", "\n", allTasks);
// 	// };
// 	render() {

// 	tasks = allTasks.map((task, index) => {
// 		return (
// 			<TodoItem
// 				// deleteTask={() => deleteTaskHandler(index)}
// 				done={task.done}
// 				task={task.description}
// 				id={index}
// 			/>
// 		);
// 	});

// 	r
// }
// }
// export default Todo;

class Todo extends Component {
	state = {
		allTasks: [
			{ description: "Finish todo component", done: true },
			{ description: "Go and eat" },
			{ description: "Work on presentation slides" },
		],
	};

	addTaskHandler = (event) => {
		if (event.keyCode === 13) {
			const allTasks = [...this.state.allTasks];
			allTasks.push({ description: event.target.value });
			this.setState({ allTasks: allTasks });
			console.log("task added");
		}
	};

	deleteTaskHandler = (taskIndex) => {
		const allTasks = [...this.state.allTasks];
		allTasks.splice(taskIndex, 1);
		this.setState({ allTasks: allTasks });
		console.log(taskIndex, " deleted");
	};

	render() {
		let tasks;

		tasks = this.state.allTasks.map((task, index) => {
			return (
				<TodoItem
					key={index}
					done={task.done}
					task={task.description}
					deleteTask={() => this.deleteTaskHandler(index)}
				/>
			);
		});
		return (
			<div className="bg-black bg-opacity-97 absolute bottom-8 right-0 w-80 p-4">
				{tasks}
				<NewTodo addTask={this.addTaskHandler} />
			</div>
		);
	}
}

export default Todo;
