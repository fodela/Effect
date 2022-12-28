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
      console.log("res 💁", res);
      console.log("data 💻", data);
      setAuth({ email, password, data });
    } catch (error) {
      console.log(error);
      setErrMsg(error.errMsg);
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
