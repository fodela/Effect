import { useEffect, useState } from "react";
import axios from "axios";

const useWeatherApi = (API_KEY, locationKey) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await axios.get(
          `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}`,
          {
            params: {
              apikey: API_KEY,
            },
          }
        );
        setWeather(response.data[0]);
      } catch (error) {
        setError(error.message);
      }
    };
    if (locationKey) {
      getWeather();
    }
  }, [locationKey, API_KEY]);
  return [weather, error];
};

export default useWeatherApi;
