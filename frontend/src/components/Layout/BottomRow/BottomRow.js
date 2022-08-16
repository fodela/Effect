import Todo from "./Todo/Todo";

const BottomRow = () => {
	return (
		<div className="flex justify-between ">
			<div className="bottom-left flex w-1/2 gap-2">
				<i>Se-I</i>
				<p>image info</p>
			</div>
			<div className="bottom-right relative">
				Todo
				<Todo />
			</div>
		</div>
	);
};
export default BottomRow;
