import React from "react";
import API from "../utils/API";

export default function Login({
  handleLoginFormChange,
  loginFormData,
  clearLoginForm,
  setUserToken,
}) {
  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    const response = await API.loginUser(loginFormData);
    console.log(response);
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleLoginFormSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          onChange={handleLoginFormChange}
          value={loginFormData.username}
          name="username"
          placeholder="username"
        ></input>
        <label htmlFor="password">Password:</label>
        <input
          onChange={handleLoginFormChange}
          value={loginFormData.password}
          name="password"
          placeholder="password"
          type="password"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
