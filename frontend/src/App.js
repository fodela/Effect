import React from "react";
import BottomRow from "./components/Layout/BottomRow/BottomRow";
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
						<div className="logo h-12 w-12 bg-[#444] rounded-full p-1">
							<img src="logo.png" alt="" />
						</div>

						{/* <Weather /> */}
					</div>

					<div className="grow main "></div>
					<div className="region-main h-1/2 ">
						<MainRegion />
					</div>
					<div className=" grow quote text-center w-3/4 mx-auto">
						You can't compete with someone who is having fun
					</div>
					<BottomRow />
				</div>
			</Layout>
		</div>
	);
}

export default App;
