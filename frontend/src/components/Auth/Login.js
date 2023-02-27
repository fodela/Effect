import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import LoadingSpinner from "../Loading/LoadingSpinner";
import Modal from "../Modal";

const Login = ({ setIsRegistered }) => {
  const emailRef = useRef();
  const pwdRef = useRef();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errMsg, setErrMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { setAuth } = useContext(AuthContext);
  // autofocus
  useEffect(() => {
    email ? pwdRef.current.focus() : emailRef.current.focus();
  }, [email]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "/auth/login",
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

      setAuth({
        email,
        access_token,
        refresh_token,
      });
    } catch (error) {
      pwdRef.current.value = "";
      setEmail(null);
      setPassword(null);
      console.log(error);
      if (!error?.response) {
        setErrMsg("No server response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (error.response?.status === 401) {
        setErrMsg("Wrong email or password");
      } else {
        setErrMsg("Login Failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!email ? (
        <>
          {errMsg && (
            <div className="text-sm md:text-lg text-red-600 bg-white p-1 shadow-md rounded-sm my-2">
              ⚠️ Login error: {errMsg}
            </div>
          )}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setEmail(emailRef.current.value);
              emailRef.current.value = "";
            }}
          >
            <div className="bgShadow" />
            <input
              className="outline-none border-b-4 bg-inherit opacity-90 p-2 "
              type="email"
              placeholder="Enter your email"
              ref={emailRef}
              onChange={() => setErrMsg(null)}
            />
          </form>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          {isLoading && (
            <Modal modalId={"root-modal"} open={isLoading}>
              <LoadingSpinner />
            </Modal>
          )}
          <input
            className="outline-none border-b-2 bg-inherit 
            backdrop-blur
            "
            type="password"
            placeholder="Enter your password"
            ref={pwdRef}
            onChange={(event) => setPassword(event.target.value)}
          />
        </form>
      )}
      <div className="text-lg mt-4">
        Don't have an account?
        <button onClick={() => setIsRegistered(false)}>Signup</button>
      </div>
    </>
  );
};

export default Login;
