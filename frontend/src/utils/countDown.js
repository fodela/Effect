const countDown = (time) => {
	let minutes = Math.floor(time / 60);
	minutes = minutes < 10 ? "0" + minutes : minutes;
	let seconds = Math.floor(time % 60);
	seconds = seconds < 10 ? "0" + seconds : seconds;
	time--;
	return { minutes: minutes, seconds: seconds, totalTimeLeft: time };
};

export default countDown;
