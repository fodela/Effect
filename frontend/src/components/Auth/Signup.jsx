import React, { useContext, useEffect, useState } from "react";
import axios from "../../app/api/axios";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { FiEye, FiEyeOff, FiUser } from "react-icons/fi";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(.{8,})$/;

const SignUp = ({ setIsRegistered }) => {
  console.log("Re-rendered");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isMatchPassword, setIsMatchPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "/auth/register",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // const data = res.data;
      // const accessToken = res?.data?.accessToken;
      // const refresh_token = res?.data?.refresh_token;

      setIsRegistered(true);
      // Handle successful login (e.g., redirect to another page)
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        setErrMsg("");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing email or password");
      } else if (error.response?.status === 401) {
        setErrMsg("Wrong email or password");
      } else {
        setErrMsg("Registration Failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setIsValidPassword(PASSWORD_REGEX.test(password));
  }, [password]);
  useEffect(() => {
    setIsMatchPassword(password === confirmPassword);
  }, [confirmPassword]);

  return (
    <div className="bg-bw px-3 sm:px-5  rounded-3xl backdrop-blur-sm pb-5 ">
      <div className="w-32 h-32 rounded-full mx-auto  bg-bw  -translate-y-1/3 flex items-center justify-center border-b border-r">
        <FiUser size={80} />
      </div>
      <form
        className="
      flex flex-col gap-2 items-center  md:text-2xl my-5 mt-14 
      px-2 relative"
        onSubmit={handleSubmit}
      >
        {errMsg && <p className="text-red-500 absolute -top-20">{errMsg}</p>}
        <h3 className="uppercase font-bold text-2xl md:text-3xl self-center">
          Create Account
        </h3>
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
              className={`bg-transparent outline-none w-full`}
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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

        <div className="flex flex-col w-full">
          <label htmlFor="password" className="text-lg">
            Confirm Password
          </label>
          <div
            className={`flex border-b-2 border-white/30 pr-2
        
        `}
          >
            <input
              required
              id="confirm_password"
              className={`bg-transparent outline-none w-full`}
              type={isConfirmPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />

            <div
              className="cursor-pointer"
              title={
                isConfirmPasswordVisible ? "Show Password" : "Hide Password"
              }
              onClick={() => setIsPasswordVisible(!isConfirmPasswordVisible)}
            >
              {isConfirmPasswordVisible ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>
          <p
            className={`text-sm text-red-400 
            ${password && !isMatchPassword ? "visible" : "invisible"}`}
          >
            Confirmation must match password
          </p>
        </div>

        <button
          type="submit"
          disabled={!isValidEmail && !isValidPassword && !isMatchPassword}
          className={`bg-gradient-to-br from-black/60 via-black/40 to-white/10  uppercase font-semibold px-8 py-2 border-b border-r border-white/50 self-center rounded hover:-translate-y-1 hover:shadow-md hover:shadow-white/50 transition-all active:shadow-sm active:-translate-y-[2px] 
          ${
            (!isValidEmail || !isValidPassword || !isMatchPassword) &&
            "text-white/10 hover:transform-none hover:shadow-none"
          }
          `}
        >
          {isLoading ? <LoadingSpinner /> : "sign up"}
        </button>
      </form>
      <div className="text-center text-sm mt-2">
        Don't have an account?{" "}
        <button
          className="text-blue-900 font-semibold underline"
          onClick={() => setIsRegistered(true)}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SignUp;
