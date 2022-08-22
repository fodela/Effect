import { createApi } from "unsplash-js";
const unsplashApi = createApi({
	accessKey: "ssxRTObTWUTsTNRA4FCR6sUIeznLzrtbwT6JkUzWZLA",
});
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
export default getAllWallpapers;
