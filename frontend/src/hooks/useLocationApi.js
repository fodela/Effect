import { useEffect, useState } from "react";
import axios from "axios";

const useLocationApi = (API_KEY, searchedCity = "ho", offset = 25) => {
  const [locationKey, setLocationKey] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [error, setError] = useState(null);

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
          setLocationName(data[0].EnglishName);
        } else {
          setError("No location found");
        }
      } catch (error) {
        setError(error.message);
      }
    };
    if (searchedCity) {
      getLocationKey();
    }
  }, [searchedCity, API_KEY]);
  return [locationName, locationKey, error];
};

export default useLocationApi;
