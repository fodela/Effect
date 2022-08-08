import React from "react";
import Layout from "./components/Layout/Layout";

function App() {
	return (
		<div>
			<Layout className="">
				<div
					className="flex flex-col justify-start
				p-5
				h-screen"
				>
					<div className="header flex justify-between bg-green-500 ">
						<div className="logo">Logo</div>

						<div className="weather">Weather</div>
					</div>

					<div className="grow main bg-blue-500">main</div>
					<div className="region-main h-1/2 bg-yellow-500">task</div>
					<div className="quote bg-green-300 grow">quote</div>
					<div className="grow footer bg-blue-300">footer</div>
				</div>
			</Layout>
		</div>
	);
}

export default App;
