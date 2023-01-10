import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    // Interceptors => They functions (2 one for the request or response and the other for error) that are performed on every request before they are made or on every received response before they are used.

    // Request interceptor
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,

      async (error) => {
        const prevRequest = error?.config;

        if (
          error.response.data?.msg === "Token has expired" &&
          !prevRequest.sent
        ) {
          prevRequest.sent = true; // Prevent infinite loop

          //   Refresh the access token and pass the new refreshed access token to the previous request
          const newAccessToken = await refresh();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          //   Rerun the previous request
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    //   Clean up interceptors to prevent them from piling up
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
