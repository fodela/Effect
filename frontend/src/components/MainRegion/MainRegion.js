import Clock from "./Clock";
import MainTask from "./MainTask";
import Salutation from "./Salutation";

const MainRegion = ({ children }) => {
	return (
		<div
			className="mx-auto text-center
        flex flex-col justify-center w-3/4"
		>
			<Clock />
			<Salutation />
			<MainTask />
		</div>
	);
};
export default MainRegion;
