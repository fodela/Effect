import { useState, useEffect } from "react";
import BottomRow from "./components/Layout/BottomRow/BottomRow";
import Layout from "./components/Layout/Layout";
import MainRegion from "./components/Layout/RegionCenter/MainRegion/MainRegion";
import QuoteRegion from "./components/Layout/RegionCenter/QuoteRegion/QuoteRegion";
import TopRow from "./components/Layout/TopRow/TopRow";
import axios from "./api/axios";
import useAuth from "./hooks/useAuth";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import useUser from "./hooks/useUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const { auth } = useAuth();
  const { access_token, refresh_token } = auth;
  const { user, setUser } = useUser();

  useEffect(() => {
    const getUser = async () => {
      try {
        if (access_token) {
          const res = await axios.get(
            "auth/me",

            { headers: { Authorization: `Bearer ${access_token}` } }
          );
          setUser(res.data.user);
        }
      } catch (error) {
        console.log(" 👎", error);
      }
    };
    getUser();
  }, [access_token, refresh_token]);
  return (
    <div>
      <ToastContainer />
      <Layout className=" relative">
        <div
          className="flex flex-col justify-between
				p-5
				h-[100vh]
				
				"
        >
          {user.username ? (
            <>
              <TopRow />
              {/* <div className="grow main "></div> */}
              <div className="region-main  ">
                <MainRegion />
                <QuoteRegion />
              </div>
              {/* <div className="grow"></div> */}
              <BottomRow />
            </>
          ) : (
            <div className="text-xl sm:text-3xl h-[100vh] flex flex-col items-center justify-center">
              {isRegistered ? (
                <>
                  <Login setIsRegistered={setIsRegistered} />
                </>
              ) : (
                <>
                  <Signup setIsRegistered={setIsRegistered} />
                </>
              )}
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
}

export default App;
