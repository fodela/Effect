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
						<MainRegion className="bg-black" />
					</div>
					<div className=" grow quote text-center w-3/4 mx-auto">
						You can't compete with someone who is having fun
					</div>
					<div className=" footer flex justify-between relative">
						<p>nice image from ...</p>
						<button className="cursor-pointer">Todo</button>
						<div
							className="bg-black absolute bottom-0 right-0
						flex flex-col p-3"
						>
							<div className="flex gap-1 pb-2">
								<input type="checkbox" name="" id="" className="flex gap-1" />
								<p>Go big or go home</p>
							</div>
							<div className="flex gap-1 pb-2">
								<input type="checkbox" name="" id="" />
								<p>Go big or go home</p>
							</div>
							<div className="flex gap-1 pb-2">
								<input type="checkbox" name="" id="" />
								<p>Go big or go home</p>
							</div>
							<button>Add + </button>
						</div>
					</div>
				</div>
			</Layout>
		</div>
	);
}

export default App;
