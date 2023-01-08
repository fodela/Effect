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
// import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

function App() {
  const [isRegistered, setIsRegistered] = useState(true);
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
      <Layout className=" relative">
        <div
          className="flex flex-col justify-start
				p-5
				h-[100vh]
				
				"
        >
          {user.username ? (
            <>
              <TopRow />
              <div className="grow main "></div>
              <div className="region-main h-1/2 ">
                <MainRegion />
              </div>
              <QuoteRegion />
              <div className="grow"></div>
              <BottomRow />
            </>
          ) : (
            <div className="text-xl sm:text-3xl h-[100vh] flex flex-col items-center justify-center">
              {isRegistered ? (
                <>
                  <div className="bgShadow" />
                  <Login setIsRegistered={setIsRegistered} />
                </>
              ) : (
                <>
                  <div className="bgShadow" />
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
