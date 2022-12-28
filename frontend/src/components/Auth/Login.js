import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return email ? (
    <input type="email" placeholder="Enter your email" />
  ) : (
    <input type="password" placeholder="Enter your password" />
  );
};

export default Login;
