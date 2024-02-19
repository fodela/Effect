import React, { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { FiEye, FiEyeOff, FiUser } from "react-icons/fi";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import axios from "../../app/api/axios";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(.{8,})$/;

const Login = ({ setIsRegistered }) => {
  console.log("Re-rendered");
  const emailRef = useRef();
  const pwdRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // console.log(" 🤩");
      // const response = await login({ email, password });
      // console.log("===========>", response);
      // const userData = response.unwrap();
      // console.log(" 👍 👍", userData);
      // const accessToken = userData?.access_token;
      // const user = userData.username;
      // dispatch(setCredentials({ accessToken, user }));
      // setEmail("");
      // setPassword("");

      const res = await axios.post(
        "/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = res.data;
      const user = res?.data?.username;
      const accessToken = res?.data?.access_token;
      const refresh_token = res?.data?.refresh_token;
      console.log(user, " 👨");
      dispatch(
        setCredentials({
          user,
          accessToken,
        })
      );
    } catch (error) {
      pwdRef.current.value = "";
      setEmail("");
      setPassword("");
      console.log(error, "<--- 👎");
      if (!error?.response) {
        setErrMsg("No server response ");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing email or password");
      } else if (error.response?.status === 401) {
        setErrMsg("Wrong email or password");
      } else {
        setErrMsg("Login Failed");
      }
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setIsValidPassword(PASSWORD_REGEX.test(password));
  }, [password]);

  return (
    <div className="bg-bw px-3 sm:px-5  rounded-3xl backdrop-blur-sm pb-5 ">
      <div className="w-32 h-32 rounded-full mx-auto  bg-bw  -translate-y-1/3 flex items-center justify-center border-b border-r">
        <FiUser size={80} />
      </div>
      <form
        className="
      flex flex-col gap-5 items-center text-xl md:text-2xl my-5 mt-14 
      px-2 relative"
        onSubmit={handleSubmit}
      >
        {errMsg && <p className="text-red-500 absolute -top-20">{errMsg}</p>}
        <h3 className="uppercase font-bold text-3xl self-center">Welcome</h3>
        <div className="flex flex-col w-full">
          <label htmlFor="email" className="text-lg">
            E-mail
          </label>
          <input
            required
            id="email"
            className={`bg-transparent outline-none border-b-2 border-white/30 
            ${isValidEmail && email && "border-green-400 text-green-200"} 
            ${!isValidEmail && email && "border-red-600 text-red-200"} 
            `}
            type="text"
            ref={emailRef}
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <p
            className={`text-sm text-red-400 
            ${email && !isValidEmail ? "visible" : "invisible"}`}
          >
            Email must be in the form example@mail.com
          </p>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="password" className="text-lg">
            Password
          </label>
          <div
            className={`flex border-b-2 border-white/30 pr-2
        
        `}
          >
            <input
              required
              id="password"
              className={`bg-transparent outline-none `}
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              ref={pwdRef}
            />

            <div
              className="cursor-pointer"
              title={isPasswordVisible ? "Show Password" : "Hide Password"}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>
          <p
            className={`text-sm text-red-400 
            ${password && !isValidPassword ? "visible" : "invisible"}`}
          >
            Password must 8 characters or more
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-br from-black/60 via-black/40 to-white/10  uppercase font-semibold px-8 py-2 border-b border-r border-white/50 self-center rounded hover:-translate-y-1 hover:shadow-md hover:shadow-white/50 transition-all active:shadow-sm active:-translate-y-[2px]"
        >
          {isLoading ? <LoadingSpinner /> : "Login"}
        </button>
      </form>
      <div className="text-center text-sm mt-2">
        Don't have an account?{" "}
        <button
          className="text-blue-900 font-semibold underline"
          onClick={() => setIsRegistered(false)}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;
