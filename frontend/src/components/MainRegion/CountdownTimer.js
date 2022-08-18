import { Component } from "react";
// import getRemainingTime from "../getRemainingTime";

class CountdownTimer extends Component {
	state = {
		remainingTime: {
			minutes: "25",
			seconds: "00",
		},
		counterState: "Start",
	};

	startTimerHandler = () => {
		console.log("time started!");
		this.setState({ counterState: "Stop" });
	};

	stopTimerHandler = () => {
		console.log("time stoped!");
		this.setState({ counterState: "Start" });
	};
	render() {
		// let time = countdownTime * 60;
		// // Add the state of timer variables

		// const [startTime, setStartTime] = useState(time);

		// useEffect(() => {
		// 	const intervalID = setInterval(() => {
		// 		// updateRemainingTime();
		// 	}, 1000);

		// 	return () => clearInterval(intervalID);
		// }, []);

		// function updateRemainingTime() {
		// 	console.log(remainingTime);
		// 	setRemainingTime(getRemainingTime(startTime));
		// }
		let counterButton =
			this.state.counterState === "Start" ? (
				<button
					onClick={this.startTimerHandler}
					className="bg-[#444] px-2 rounded-lg mt-2 cursor-pointer"
				>
					{this.state.counterState}
				</button>
			) : (
				<button
					onClick={this.stopTimerHandler}
					className="bg-[#444] px-2 rounded-lg mt-2 cursor-pointer"
				>
					{this.state.counterState}
				</button>
			);

		return (
			<div className="border-t-2 border-x-2 rounded-3xl px-5 pt-5 pb-2 after:yes border-y-none mx-auto mb-4 ">
				<div className="text-5xl mb-4 ">
					{this.state.remainingTime.minutes} :{" "}
					{this.state.remainingTime.seconds}
				</div>
				<p>focus</p>
				{counterButton}
			</div>
		);
	}
}

CountdownTimer.defaultProps = {
	countdownTime: 10,
};
export default CountdownTimer;
