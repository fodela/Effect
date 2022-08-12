import { useState, useEffect } from "react";

const defaultRemainingTime = {
	minutes: "00",
	seconds: "00",
};

const CountdownTimer = ({ countdownTime }) => {
	let time = countdownTime * 60;
	// Add the state of timer variables
	let [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

	// call the update remaining time function every second using useEffect
	useEffect(() => {
		// create as a constant (to enable clearing the interval) a 1 second interval that calls the function when the component is mounted for the first time. This will create an infinite loop though hence the need for a clear interval function.
		const intervalId = setInterval(() => {
			updateRemainingTime();
		}, 1000);

		// clear the interval
		return () => clearInterval(intervalId);
	}, []);

	const getRemainingTime = () => {
		let minutes = Math.floor(time / 60);
		remainingTime.minutes = minutes < 10 ? "0" + minutes : minutes;
		let seconds = time % 60;
		remainingTime.seconds = seconds < 10 ? "0" + seconds : seconds;
		console.log(remainingTime.minutes + ":" + remainingTime.seconds);
		time--;
		return remainingTime;
	};
	// Create a function that updates the remaining time
	const updateRemainingTime = () => {
		setRemainingTime(getRemainingTime);
	};
	return (
		<div>
			<p>
				<span>remainingTime</span>
			</p>
		</div>
	);
};

CountdownTimer.defaultProps = {
	countdownTime: 0.5,
};
export default CountdownTimer;
