import { Component } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem/TodoItem";

class Todo extends Component {
	state = {
		allTasks: [
			{ description: "Go Big or go Home" },
			{ description: "Finish Pomodoro timer", done: true },
			{ description: "Work on presentation slides" },
		],
	};

	changeTodoStateHandler = (taskIndex) => {
		const allTasks = [...this.state.allTasks];
		allTasks[taskIndex].done = allTasks[taskIndex].done ? false : true;
		this.setState({ allTasks: allTasks });
	};

	addTaskHandler = (event) => {
		if (event.keyCode === 13) {
			const taskDescription = event.target.value.trim();
			const allTasks = [...this.state.allTasks];
			if (event.target.value !== "") {
				allTasks.push({ description: taskDescription });
				this.setState({ allTasks: allTasks });
				event.target.value = "";
			}
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
					changeTodoState={() => this.changeTodoStateHandler(index)}
				/>
			);
		});
		return (
			<div className="bg-black bg-opacity-70 absolute bottom-8 right-0 w-80 p-4  rounded-md">
				<div className="todo-header">Today</div>
				<div className="task-container max-h-[calc(60vh)] overflow-y-auto ">
					{tasks}
				</div>
				<NewTodo addTask={this.addTaskHandler} />
			</div>
		);
	}
}

export default Todo;
