import React, { useState } from "react";
import API from "../utils/API";

export default function Login({
  handleLoginFormChange,
  loginFormData,
  clearLoginForm,
  setUserToken,
}) {
  const [isUserPassCorrect, setIsUserPassCorrect] = useState(true);

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    const response = await API.loginUser(loginFormData);
    console.log(response.data);
    if (!response.data) {
      clearLoginForm();

      setIsUserPassCorrect(false);
      setTimeout(() => {
        setIsUserPassCorrect(true);
      }, 1000);
    } else if (response.status === 200) {
      clearLoginForm();
      setUserToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      console.log(response.data.token);
    }
  };

  return (
    <>
      <h1>Login</h1>
      {isUserPassCorrect === false ? (
        <p>Username or password incorrect.</p>
      ) : (
        <></>
      )}
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
