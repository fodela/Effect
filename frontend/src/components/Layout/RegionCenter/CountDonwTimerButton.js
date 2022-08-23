const CountDownTimerButton = (props) => {
	return (
		<button
			onClick={props.click}
			className="bg-[#0000003c] text-white border-1  px-2 rounded-lg mt-2 cursor-pointer"
		>
			{props.children}
		</button>
	);
};
export default CountDownTimerButton;
