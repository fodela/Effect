import React from "react";
import Layout from "./components/Layout/Layout";
import MainRegion from "./components/MainRegion/MainRegion";
import Weather from "./components/Weather";

function App() {
	return (
		<div>
			<Layout className="">
				<div
					className="flex flex-col justify-start
				p-5
				h-screen"
				>
					<div className="region-top flex justify-between  place-items-center">
						<div className="logo h-12 w-12">
							<img src="logo.png" alt="" />
						</div>

						<Weather />
					</div>

					<div className="grow main "></div>
					<div className="region-main h-1/2 ">
						<MainRegion />
					</div>
					<div className="quote  grow">
						You can't compete with someone who is having fun
					</div>
					<div className="grow footer ">nice image from ...</div>
				</div>
			</Layout>
		</div>
	);
}

export default App;
