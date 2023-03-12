import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/API';
import '../assets/css/SignUp.css';

export default function Login({
  handleLoginFormChange,
  loginFormData,
  clearLoginForm,
  setUserToken,
  userObject
}) {
  const [isUserPassCorrect, setIsUserPassCorrect] = useState(true);
  console.log(userObject)
  const navigate = useNavigate();
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
      return navigate("/home");
    }
  };

  return (
    <div className="form">
      <h1>Login</h1>
      {isUserPassCorrect === false ? (
        <p>Username or password incorrect.</p>
      ) : (
        <></>
      )}
      <form onSubmit={handleLoginFormSubmit}>
        <div className="table">
          <div className="input">
            <label htmlFor="username">Username:</label>
            <input
              onChange={handleLoginFormChange}
              value={loginFormData.username}
              name="username"
              placeholder="username"
              className="textbar"
            ></input>
          </div>
          <div className="input">
            <label htmlFor="password">Password:</label>
            <input
              onChange={handleLoginFormChange}
              value={loginFormData.password}
              name="password"
              placeholder="password"
              type="password"
              className="textbar"
            ></input>
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
