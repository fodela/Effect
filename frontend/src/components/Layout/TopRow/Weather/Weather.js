import { useState, useEffect } from "react";
import getWeatherDetails from "../../../../utils/getWeatherDetails";
const Weather = () => {
	const [weatherDetails, setWeatherDetails] = useState(null);

	useEffect(() => {
		setWeatherDetails(getWeatherDetails());
	}, []);
	console.log(weatherDetails);
	return (
		<div className="grid grid-cols-2">
			<i className="grid row-span-2 ">{weatherDetails.icon}</i>
			<p>{weatherDetails.temperature}</p>
			<p>{weatherDetails.location}</p>
		</div>
	);
};
export default Weather;
