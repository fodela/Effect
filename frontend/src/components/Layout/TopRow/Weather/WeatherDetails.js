const WeatherDetails = () => {
	return (
		<div>
			<div className="flex flex-col bg-black/70 absolute top-1 right-1 w-[90vw] ">
				<header className="flex justify-between">
					<div>
						<p className="text-xl ">Ho</p>
						<p>Partly cloudy</p>
					</div>
					<div className="flex gap-5">
						<div>...</div>
						<button className="rounded-full px-2 py-1 bg-gray-500">x</button>
					</div>
				</header>
				<div className="text-6xl flex gap-4">
					<i>Cl</i>
					<h2>24°</h2>
				</div>
				<section></section>
			</div>
			<div></div>
		</div>
	);
};
export default WeatherDetails;
