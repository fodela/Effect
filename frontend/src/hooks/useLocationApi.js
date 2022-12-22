import React, { useEffect } from "react";
import axios from "axios";
require("dotenv").config();

// const API_KEY = process.env.API_KEY;
const useLocationApi = (API_KEY, searchedCity = "ho", offset = 25) => {
  const [locationKey, setLocationKey] = useState(null);

  useEffect(() => {
    const getLocationKey = async () => {
      try {
        const response = await axios.get(
          `http://dataservice.accuweather.com/locations/v1/cities/search?`,
          {
            params: {
              apikey: API_KEY,
              q: searchedCity,
            },
          }
        );
        const data = response.data;
        if (data.length > 0) {
          setLocationKey(data[0].Key);
        } else {
          setError("No location found");
        }
      } catch (error) {
        setError(error.message);
      }

      if (searchedCity) {
        getLocationKey();
      }
    };
  }, [searchedCity]);
  return [locationKey, error];
};

export default useLocationApi;
