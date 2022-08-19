// import { useState, useEffect } from "react";
// import { createApi } from "unsplash-js";
// import getWeatherDetails from "../../utils/getWeatherDetails";
// const unsplashApi = createApi({
// 	accessKey: "ssxRTObTWUTsTNRA4FCR6sUIeznLzrtbwT6JkUzWZLA",
// });

const Layout = (props) => {
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
		bg-[url('https://images.unsplash.com/photo-1564537499-9ed6029493f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80')] 
		bg-[#000]"
		>
			{props.children}
		</div>
	);
};

export default Layout;
