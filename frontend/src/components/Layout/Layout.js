import { useState, useEffect } from "react";
import { createApi } from "unsplash-js";

const unsplashApi = createApi({
	accessKey: "ssxRTObTWUTsTNRA4FCR6sUIeznLzrtbwT6JkUzWZLA",
});

const Layout = ({ children }) => {
	const [imageData, setImageQueryResponse] = useState(null);

	useEffect(() => {
		unsplashApi.search
			.getPhotos({
				query: "mountain",
				collections: "mountain",
			})
			.then((result) => {
				setImageQueryResponse(result);
			})
			.catch((error) => {
				console.log(`Something went wrong \n${error}`);
			});
	}, []);

	let photo;

	imageData == null
		? console.log("loading...")
		: imageData.errors
		? console.log(imageData.errors[0])
		: (photo =
				imageData.response.results[Math.floor(Math.random() * 10)].urls.full);

	return (
		<div
			className="h-screen relative
		bg-[rgba(0,0,0,.3)]"
		>
			<img
				src={photo}
				alt="background-img"
				className="object-cover w-full h-full absolute mix-blend-overlay text-center"
			/>
			{children}
		</div>
	);
};

export default Layout;
