import React from "react";
import Layout from "./components/Layout/Layout";

function App() {
	return (
		<div>
			<Layout className="">
				<div className="flex flex-col p-5 justify-between">
					<div className="header flex justify-between bg-green-500 ">
						<div className="logo">Logo</div>

						<div className="weather">Weather</div>
					</div>

					<div className="grow main bg-blue-500">main</div>
					<div className="task bg-yellow-500">task</div>
					<div className="quote bg-green-300">quote</div>
					<div className="footer bg-blue-300">footer</div>
				</div>
			</Layout>
		</div>
	);
}

export default App;
