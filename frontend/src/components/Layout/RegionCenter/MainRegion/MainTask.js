import TodoItem from "../../BottomRow/Todo/TodoItem/TodoItem";

const MainTask = () => {
	return (
		<div className="flex text-xl gap-2  mx-auto">
			<TodoItem
				// done={() => changeMainTaskState()}
				task="Post update on twitter"
			/>
		</div>
	);
};
export default MainTask;
