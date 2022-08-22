// import getAllWallpapers from "../../utils/getWallpapersDetails";
import { createApi } from "unsplash-js";
const unsplashApi = createApi({
	accessKey: "ssxRTObTWUTsTNRA4FCR6sUIeznLzrtbwT6JkUzWZLA",
});

let day = 1;

const Layout = (props) => {
	let storedWallpapers = localStorage.getItem("allWallpapers");

	const getAllWallpapers = () => {
		let allWallpapers;

		unsplashApi.search
			.getPhotos({
				query: "mountain",
				collections: "wallpaper",
				per_page: 30,
			})
			.then((result) => {
				allWallpapers = result.response.results;
				console.log("dfsjdfs", allWallpapers);
			})
			.catch((error) => {
				console.log(`Something went wrong \n${error}`);
			});

		// store wallpaper to localStorage
		localStorage.setItem("allWallpapers", allWallpapers);
		return allWallpapers;
	};
	if (storedWallpapers) {
	} else
		return (
			<div
				className={`h-screen relative
		
		bg-[#0000003c] bg-cover  bg-blend-overlay`}
			>
				{props.children}
			</div>
		);
};

export default Layout;
