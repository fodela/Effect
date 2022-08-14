import CountdownTimer from "./CountdownTimer";
import MainTask from "./MainTask";
import Salutation from "./Salutation";

const MainRegion = ({ children }) => {
	return (
		<div
			className="p-5 mx-auto text-center
        flex flex-col justify-between w-3/4 h-3/4 bg-black"
		>
			<CountdownTimer />
			<Salutation />
			<MainTask />
		</div>
	);
};
export default MainRegion;
