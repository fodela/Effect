// import { useState, useEffect } from "react";
// import { createApi } from "unsplash-js";
// import getWeatherDetails from "../../utils/getWeatherDetails";

// const unsplashApi = createApi({
// 	accessKey: "ssxRTObTWUTsTNRA4FCR6sUIeznLzrtbwT6JkUzWZLA",
// });

const Layout = ({ children }) => {
	// const [imageData, setImageQueryResponse] = useState(null);

	// function getWapaperDetails() {
	// 	unsplashApi.search
	// 		.getPhotos({
	// 			query: "mountain",
	// 			collections: "mountain",
	// 			per_page: 30,
	// 		})
	// 		.then((result) => {
	// 			setImageQueryResponse(result);
	// 			console.log(result);
	// 		})
	// 		.catch((error) => {
	// 			console.log(`Something went wrong \n${error}`);
	// 		});
	// }

	// useEffect(() => {
	// 	// getWapaperDetails();
	// }, []);

	// let photo;

	// imageData == null
	// 	? console.log("loading...")
	// 	: imageData.errors
	// 	? console.log(imageData.errors[0])
	// 	: (photo =
	// 			imageData.response.results[Math.floor(Math.random() * 30)].urls.full);

	return (
		<div
			className="h-screen relative
		bg-[rgba(0,0,0,.3)]"
		>
			<img
				alt="background-img"
				className="object-cover w-full h-full absolute mix-blend-overlay text-center"
			/>
			{children}
		</div>
	);
};

export default Layout;
