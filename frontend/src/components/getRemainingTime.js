const getRemainingTime = (startTime) => {
	// let time = countdownTime * 60;
	let computedMinutes = Math.floor(startTime / 60);
	computedMinutes =
		computedMinutes < 10 ? "0" + computedMinutes : computedMinutes;

	let computedSeconds = Math.floor(startTime % 60);
	computedSeconds =
		computedSeconds < 10 ? "0" + computedSeconds : computedSeconds;

	startTime--;
	console.log(computedMinutes, ":", computedSeconds);

	return (
		{
			minutes: computedMinutes,
			seconds: computedSeconds,
		},
		(startTime = startTime)
	);
};

export default getRemainingTime;
