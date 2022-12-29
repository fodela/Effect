// import React from "react";
import BottomRow from "./components/Layout/BottomRow/BottomRow";
import Layout from "./components/Layout/Layout";
import MainRegion from "./components/Layout/RegionCenter/MainRegion/MainRegion";
import QuoteRegion from "./components/Layout/RegionCenter/QuoteRegion/QuoteRegion";
import TopRow from "./components/Layout/TopRow/TopRow";
import { AuthProvider } from "./context/AuthProvider";
import { WeatherProvider } from "./context/weatherContext";

function App() {
  return (
    <WeatherProvider>
      <AuthProvider>
        <div>
          <Layout className=" relative">
            <div
              className="flex flex-col justify-start
				p-5
				h-[100vh]
				
				"
            >
              <TopRow />
              <div className="grow main "></div>
              <div className="region-main h-1/2 ">
                <MainRegion />
              </div>
              <QuoteRegion />
              <div className="grow"></div>
              <BottomRow />
            </div>
          </Layout>
        </div>
        ]{" "}
      </AuthProvider>
    </WeatherProvider>
  );
}

export default App;
