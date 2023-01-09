import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";

const Signup = ({ setIsRegistered }) => {
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
        "auth/register",
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
    <>
      <form
        className="p-4 text-xl opacity-90 flex flex-col gap-4 rounded-md"
        onSubmit={handleSubmit}
      >
        <h3 className="uppercase font-bold text-3xl self-center">
          Create Account
        </h3>
        <input
          className="outline-none border-b-2 bg-inherit p-2"
          type="text"
          ref={userRef}
          placeholder="Enter your username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          className="outline-none border-b-2 bg-inherit p-2"
          type="email"
          placeholder="Enter your email"
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          className="outline-none border-b-2 bg-inherit p-2"
          type="password"
          placeholder="Enter your password"
          ref={pwdRef}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="bg-green-500 text-gray-100 rounded-full uppercase font-bold w-1/2 text-sm self-center">
          Create Account
        </button>
      </form>
      <div className="text-lg mt-2">
        Already have an account?
        <button onClick={() => setIsRegistered(true)}>Login</button>
      </div>
    </>
  );
};

export default Signup;
