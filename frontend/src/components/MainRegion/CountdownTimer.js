import { useState, useEffect } from "react";
import getRemainingTime from "../getRemainingTime";

const defaultRemainingTime = {
	minutes: "25",
	seconds: "00",
};

const CountdownTimer = ({ countdownTime }) => {
	let time = countdownTime * 60;
	// Add the state of timer variables
	const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
	const [startTime, setStartTime] = useState(time);

	useEffect(() => {
		const intervalID = setInterval(() => {
			// updateRemainingTime();
		}, 1000);

		return () => clearInterval(intervalID);
	}, []);

	function updateRemainingTime() {
		console.log(remainingTime);
		setRemainingTime(getRemainingTime(startTime));
	}
	return (
		<div className="border-t-2 border-x-2 rounded-3xl px-5 pt-5 pb-2 after:yes border-y-none mx-auto ">
			<div className="text-5xl">
				{remainingTime.minutes} : {remainingTime.seconds}
			</div>
			<button className="bg-[#444] px-2 py-1 rounded-lg mt-2">Start</button>
		</div>
	);
};

CountdownTimer.defaultProps = {
	countdownTime: 10,
};
export default CountdownTimer;
