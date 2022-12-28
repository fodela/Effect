import { useState } from "react";
import CountdownTimer from "../../../../containers/CountdownTimer";
import Login from "../../../Auth/Login";
import Signup from "../../../Auth/Signup";
import MainTask from "./MainTask";
import Salutation from "./Salutation";

const MainRegion = ({ children }) => {
  const [me, setMe] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  return (
    <div
      className="p-5 mx-auto text-center
        flex flex-col justify-between gap-5 "
    >
      {me ? (
        <>
          <CountdownTimer />
          <Salutation />
          <MainTask />
        </>
      ) : isRegistered ? (
        <>
          <Login />
          <div>
            Don't have an account?
            <button onClick={() => setIsRegistered(false)}>Signup</button>
          </div>
        </>
      ) : (
        <>
          <Signup />
          <div>
            Already have an account?
            <button onClick={() => setIsRegistered(true)}> Login</button>
          </div>
        </>
      )}
    </div>
  );
};
export default MainRegion;
