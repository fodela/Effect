// import React from "react";
import BottomRow from "./components/Layout/BottomRow/BottomRow";
import Layout from "./components/Layout/Layout";
import MainRegion from "./components/Layout/RegionCenter/MainRegion/MainRegion";
import TopRow from "./components/Layout/TopRow/TopRow";
// import Weather from "./components/Weather";

function App() {
	return (
		<div>
			<Layout className="">
				<div
					className="flex flex-col justify-start
				p-5
				h-screen"
				>
					<TopRow />
					<div className="grow main "></div>
					<div className="region-main h-1/2 ">
						<MainRegion />
					</div>
					<div className=" grow quote text-center w-3/4 mx-auto">
						You can't compete with someone who is having fun
					</div>
					<div className="grow"></div>
					<BottomRow />
				</div>
			</Layout>
		</div>
	);
}

export default App;
