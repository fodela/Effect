import axios from "axios";
import { useState } from "react";

// const { REACT_APP_ACCUWEATHER_ACCESS_KEY } = process.env;

let location = "ho ghana";

const WeatherDetails = () => {
	const [weatherInfo, setWeatherInfo] = useState(null);

	const getLocationKey = () => {
		console.log("location funx");
		axios
			.get(
				`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=Z7BLjCA9DVKV1q2GQR9bjmNbZcvcH4a3&q=${location}`
			)
			.then((response) => {
				setWeatherInfo(response.data[0]);
				localStorage.currentLocationForEffect = JSON.stringify(weatherInfo);
			});
	};

	const getLocationInfo = () => {
		if (localStorage.currentLocationForEffect) {
			setWeatherInfo(JSON.parse(localStorage.currentLocationForEffect));
		} else {
			// getLocationKey();
		}
	};
	// getLocationInfo();

	// console.log("api key", REACT_APP_ACCUWEATHER_ACCESS_KEY);

	// const locationDetails = getLocationKey();
	// const city = locationDetails.EnglishName;
	// const locationKey = locationDetails.Key;

	return (
		<div>
			<div className="flex flex-col bg-black/70 absolute top-1 right-1 w-[90vw] ">
				<header className="flex justify-between">
					<div>
						<p className="text-xl ">weatherInfo.EnglishName</p>
						<p>Partly cloudy</p>
					</div>
					<div className="flex gap-5">
						<div>...</div>
						<button className="rounded-full px-2 py-1 bg-gray-500">x</button>
					</div>
				</header>
				<div className="text-6xl flex gap-4">
					<i>C</i>
					<h2>24°</h2>
				</div>
				<a href="https://www.accuweather.com/" className="text-xs text-right">
					<strong>Accuweather</strong> more weather &rarr;
				</a>

				<section></section>
			</div>
			<div></div>
		</div>
	);
};
export default WeatherDetails;
