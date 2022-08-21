import { Component } from "react";
import countDown from "../utils/countDown";
// import getRemainingTime from "../getRemainingTime";

class CountdownTimer extends Component {
	state = {
		remainingTime: {
			minutes: "25",
			seconds: "00",
			totalTimeLeft: "00",
		},
		counterState: "Stopped",
	};

	startTimer = () => {
		this.timerInterval = setInterval(() => {
			this.setState({ remainingTime: countDown() });
			console.log(this.state.remainingTime);
		}, 1000);
	};

	startTimerHandler = () => {
		console.log("time started!");
		this.setState({ counterState: "Started" });
		this.startTimer();
	};

	pauseTimerHandler = () => {
		console.log("time paused!");
		this.setState({ counterState: "Paused" });
		clearInterval(this.timerInterval);
	};
	stopTimerHandler = () => {
		console.log("time stopped!");
		this.setState({ counterState: "Start" });
		clearInterval(this.timerInterval);
		this.setState({ remainingTime: this.props.DefaultRemainingTime });
	};
	render() {
		// let counterButton =
		// 	this.state.counterState === "Start" ? (
		// 		<button
		// 			onClick={this.startTimerHandler}
		// 			className="bg-[#444] px-2 rounded-lg mt-2 cursor-pointer"
		// 		>
		// 			{this.state.counterState}
		// 		</button>
		// 	) : (
		// 		<button
		// 			onClick={this.startTimerHandler}
		// 			className="bg-[#444] px-2 rounded-lg mt-2 cursor-pointer"
		// 		>
		// 			Pause
		// 		</button>
		// 	);
		let counterButton;

		switch (this.state.counterState) {
			case "Started":
				counterButton = (
					<button
						onClick={this.pauseTimerHandler}
						className="bg-[#444] px-2 rounded-lg mt-2 cursor-pointer"
					>
						Pause
					</button>
				);
				break;
			case "Paused":
				counterButton = (
					<div className="flex gap-2 justify-center">
						<button
							onClick={this.startTimerHandler}
							className="bg-[#444] px-2 rounded-lg mt-2 cursor-pointer"
						>
							Continue
						</button>
						<button
							onClick={this.stopTimerHandler}
							className="bg-[#444] px-2 rounded-lg mt-2 cursor-pointer"
						>
							Stop
						</button>
					</div>
				);

				break;
			case "Stopped":
				counterButton = (
					<button
						onClick={this.startTimerHandler}
						className="bg-[#444] px-2 rounded-lg mt-2 cursor-pointer"
					>
						Start
					</button>
				);
				break;
			default:
				counterButton = (
					<button
						onClick={this.startTimerHandler}
						className="bg-[#444] px-2 rounded-lg mt-2 cursor-pointer"
					>
						Start
					</button>
				);
		}

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
	DefaultRemainingTime: {
		minutes: "25",
		seconds: "00",
		totalTimeLeft: "00",
	},
};
export default CountdownTimer;
