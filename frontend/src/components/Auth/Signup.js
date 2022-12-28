import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthProvider";

const Signup = () => {
  const userRef = useRef();
  const pwdRef = useRef();

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errMsg, setErrMsg] = useState("");

  const { setAuth } = useContext(AuthContext);
  // autofocus
  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        { username, email, password },
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
      //   setAuth({ email, password, data });
    } catch (error) {
      console.log(error);
      setErrMsg(error.errMsg);
    }
  };

  return (
    <form
      className="p-4 text-xl bg-gray-100 opacity-90 text-gray-900 flex flex-col gap-4 rounded-md"
      onSubmit={handleSubmit}
    >
      <h3>Create Account</h3>
      <input
        className="outline-none border-b-2 bg-gray-100 p-2"
        type="text"
        ref={userRef}
        placeholder="Enter your username"
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        className="outline-none border-b-2 bg-gray-100 p-2"
        type="email"
        placeholder="Enter your email"
        onChange={(event) => setEmail(event.target.value)}
      />

      <input
        className="outline-none border-b-2 bg-gray-100 p-2"
        type="emsetEmail"
        placeholder="Enter your password"
        ref={pwdRef}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button className="bg-green-500 text-gray-100 rounded-full">
        Signup
      </button>
    </form>
  );
};

export default Signup;
