// import getAllWallpapers from "../../utils/getWallpapersDetails";
import { createApi } from "unsplash-js";
const unsplashApi = createApi({
	accessKey: "ssxRTObTWUTsTNRA4FCR6sUIeznLzrtbwT6JkUzWZLA",
});

let day = 1;

const getAllWallpapers = () => {
	let allWallpapers;

	unsplashApi.search
		.getPhotos({
			query: "mountain",
			collections: "mountain",
			per_page: 30,
		})
		.then((result) => {
			allWallpapers = result.response.results;
			console.log("dfsjdfs", allWallpapers);
		})
		.catch((error) => {
			console.log(`Something went wrong \n${error}`);
		});
	return allWallpapers;
};

const Layout = (props) => {
	let allwallpapers = localStorage.getItem("allWallpapers");

	const storeAllWallpapers = (getAllWallpapers) => {
		const allWallpapersArray = getAllWallpapers();
		console.log("AAAAAAA", allWallpapersArray);
		localStorage.setItem("allWallpapers", allWallpapersArray);
		console.log("stored", allWallpapersArray[day]);
		return allWallpapersArray[day];
	};

	const retrieveAllWallpapers = () => {
		day++;
		console.log("retrieved", localStorage.getItem("allWallpapers")[day]);
		return localStorage.getItem("allWallpapers")[day];
	};

	const wallpaper =
		typeof allwallpapers === Array
			? retrieveAllWallpapers(getAllWallpapers)
			: storeAllWallpapers();

	console.log("3333333333", wallpaper);
	getAllWallpapers();

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
