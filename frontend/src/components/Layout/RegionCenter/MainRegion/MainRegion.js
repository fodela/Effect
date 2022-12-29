import { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import CountdownTimer from "../../../../containers/CountdownTimer";

import useAuth from "../../../../hooks/useAuth";
import Login from "../../../Auth/Login";
import Signup from "../../../Auth/Signup";
import MainTask from "./MainTask";
import Salutation from "./Salutation";

const MainRegion = ({ children }) => {
  const [me, setMe] = useState(null);
  const [isRegistered, setIsRegistered] = useState(true);
  const { auth } = useAuth();
  const { access_token, refresh_token } = auth;

  useEffect(() => {
    console.log(" 👍", access_token);
    const getUser = async () => {
      try {
        if (access_token) {
          const res = await axios.get(
            "auth/me",

            { headers: { Authorization: `Bearer ${access_token}` } }
          );
          setMe(res.data?.user);
        }
      } catch (error) {
        console.log(" 👎", error);
      }
    };
    getUser();
  }, [access_token, refresh_token]);
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
