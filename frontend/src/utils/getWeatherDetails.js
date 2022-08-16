// import axios from "axios";
// let weatherDetails = {
// 	location: "no location",
// 	temperature: "00",
// 	icon: "no icon",
// };

// const getWeatherDetails = () => {
// 	axios
// 		.get(
// 			"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/ho?unitGroup=metric&key=ZK8T74AATJQSX85UBQH2KWF8M&contentType=json"
// 		)
// 		.then((result) => {
// 			weatherDetails.location = result.data.resolvedAddress;
// 			weatherDetails.temperature = result.data.currentConditions.temp;
// 			weatherDetails.icon = result.data.currentConditions.icon;
// 			console.log(weatherDetails);
// 		});
// 	return weatherDetails;
// };
// export default getWeatherDetails;
