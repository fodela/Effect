import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthProvider";

const Login = () => {
  const emailRef = useRef();
  const pwdRef = useRef();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const { setAuth } = useContext(AuthContext);
  // autofocus
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
      const data = res.data;
      const access_token = res?.data?.access_token;
      const refresh_token = res?.data?.refresh_token;
      console.log("res 💁", res);
      console.log("data 💻", data);
      setAuth({
        email,
        password,
        access_token,
        refresh_token,
      });
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server response");
      } else if (error.response?.status == 400) {
        setErrMsg("Missing username or password");
      } else if (error.response?.status == 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <div className="text-xl sm:text-3xl">
      {!email ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setEmail(emailRef.current.value);
            emailRef.current.value = "";
          }}
        >
          <input
            className="outline-none border-b-2    bg-inherit opacity-90"
            type="email"
            placeholder="Enter your email"
            ref={emailRef}
          />
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            className="outline-none border-b-2 bg-inherit "
            type="password"
            placeholder="Enter your password"
            ref={pwdRef}
            onChange={(event) => setPassword(event.target.value)}
          />
        </form>
      )}
    </div>
  );
};

export default Login;
