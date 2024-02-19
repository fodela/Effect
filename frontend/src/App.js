import { useState } from "react";
import BottomRow from "./components/Layout/BottomRow/BottomRow";
import Layout from "./components/Layout/Layout";
import MainRegion from "./components/Layout/RegionCenter/MainRegion/MainRegion";
import QuoteRegion from "./components/Layout/RegionCenter/QuoteRegion/QuoteRegion";
import TopRow from "./components/Layout/TopRow/TopRow";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser, setCredentials } from "./features/auth/authSlice";


function App() {
  const [isRegistered, setIsRegistered] = useState(true);
  

  const user = useSelector(selectCurrentUser)
  console.log(user," 🥇 👨")
  
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
          {user? (
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
            <div className="my-5 sm:text-3xl h-[100vh] flex flex-col items-center justify-center">
              {
                isRegistered? <Login setIsRegistered={setIsRegistered}/> : <Signup setIsRegistered={setIsRegistered}/>
              }
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
}

export default App;
