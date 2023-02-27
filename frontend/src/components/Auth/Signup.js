import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { toast } from "react-toastify";

const Signup = ({ setIsRegistered }) => {
  const userRef = useRef();
  const pwdRef = useRef();

  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setAuth } = useContext(AuthContext);
  // autofocus
  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
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
      setIsRegistered(true);
      toast.success("Registration successful!");

      //   setAuth({ email, password, data });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);

      setErrMsg(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}

      <form
        className="p-4 text-xl opacity-90 flex flex-col gap-4 rounded-lg bg-white/10 backdrop-blur-sm"
        onSubmit={handleSubmit}
      >
       
        <h3 className="uppercase font-bold text-3xl self-center">
          Create Account
        </h3>
        <input
          className="field"
          type="text"
          ref={userRef}
          placeholder="Enter your username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          className="field"
          type="email"
          placeholder="Enter your email"
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          className="field"
          type="password"
          placeholder="Enter your password"
          ref={pwdRef}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="bg-green-900 text-green-200 rounded uppercase font-bold  text-sm p-3 self-center">
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
