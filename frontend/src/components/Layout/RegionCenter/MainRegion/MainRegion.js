import CountdownTimer from "../../../../containers/CountdownTimer";

import MainTask from "./MainTask";
import Salutation from "./Salutation";

const MainRegion = () => {
  return (
    <div
      className="p-5 mx-auto text-center
        flex flex-col justify-between gap-5 "
    >
      <>
        <CountdownTimer />
        <Salutation />
        <MainTask />
      </>
    </div>
  );
};
export default MainRegion;
