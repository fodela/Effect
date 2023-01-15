import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth, auth } = useAuth();
  const { refresh_token } = auth;
  const refresh = async () => {
    try {
      const res = await axios.get("auth/refresh", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refresh_token}`,
        },
        withCredentials: true,
      });

      setAuth((prev) => {
        return { ...prev, access_token: res.data?.access_token };
      });
      return res.data.access_token;
    } catch (error) {
      if (!error.response) {
        console.log(" 👎", "Network error");
      } else {
        console.log(" 👎: refreshToken error:", error);
      }
    }
  };
  return refresh;
};

export default useRefreshToken;
