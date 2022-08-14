import { useState, useEffect } from "react";
import getRemainingTime from "../getRemainingTime";

const defaultRemainingTime = {
	minutes: 1,
	seconds: 0,
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
		<div>
			<p>
				<span>
					{remainingTime.minutes} : {remainingTime.seconds}
				</span>
			</p>
		</div>
	);
};

CountdownTimer.defaultProps = {
	countdownTime: 10,
};
export default CountdownTimer;
