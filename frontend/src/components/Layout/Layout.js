// import getAllWallpapers from "../../utils/getWallpapersDetails";
import { createApi } from "unsplash-js";
const unsplashApi = createApi({
	accessKey: "ssxRTObTWUTsTNRA4FCR6sUIeznLzrtbwT6JkUzWZLA",
});

let day = 1;

const Layout = (props) => {
	let wallpaper;
	let storedWallpapers = localStorage.getItem("allWallpapers");
	let myStyle;

	const getAllWallpapers = () => {
		unsplashApi.search
			.getPhotos({
				query: "mountain wallpaper",
				collections: "wallpaper",
				per_page: 30,
			})
			.then((result) => {
				console.log("Stroeintnlkdjf", result.response.results[0].urls.raw);
				localStorage.allWallpapers = JSON.stringify(result.response.results);
			})
			.catch((error) => {
				console.log(`Something went wrong \n${error}`);
			});
	};
	if (storedWallpapers && day < 30) {
		day++;
		// wallpaper = localStorage.getItem("allWallpapers")[day];
		// wallpaper =
		// 	"bg-[url('" +
		// 	JSON.parse(localStorage.allWallpapers)[day].urls.raw.toString() +
		// 	"')]";

		// wallpaper =
		// 	"bg-[url('" +
		// 	JSON.parse(localStorage.allWallpapers)[day].urls.raw +
		// 	"')]";
		wallpaper = JSON.parse(localStorage.allWallpapers)[day].urls.raw;
	} else {
		getAllWallpapers();
		// wallpaper =
		// 	"bg-[url('" +
		// 	JSON.parse(localStorage.allWallpapers)[day].urls.raw.toString() +
		// 	"')]";
		wallpaper = JSON.parse(localStorage.allWallpapers)[day].urls.raw.toString();
	}
	return (
		<div className="h-screen relative bg-[#0000003c] bg-cover  bg-blend-overlay">
			{props.children}
		</div>
	);
};

export default Layout;
