import React from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../features/user";

const Login = () => {
  const dispatch = useDispatch();
  function handleLogin() {
    dispatch(login({ name: "SSK", age: 23, email: "ssk@boss.com" }));
  }

  function handleLogout() {
    dispatch(logout());
  }
  return (
    <div className="login">
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Login;
