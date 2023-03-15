import React from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/API';
import '../assets/css/SignUp.css';

export default function SignUp({
  handleSignUpFormChange,
  signUpFormData,
  clearSignupForm,
  setUserToken,
}) {
  // Instantiate navigate so we can move the user to /chat.
  const navigate = useNavigate();

  const handleSignUpFormSubmit = async (e) => {
    e.preventDefault();
    const response = await API.signUpUser(signUpFormData);
  
    if (response.status === 200) {
      clearSignupForm();
      setUserToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      // This will redirect. the redirect method in react router dom is deprecated, this is what we use now.
      return navigate("/home");
    } else {
      clearSignupForm();
    }
  };

  return (
    <div className="form">
      <h1>Create an Account</h1>
      <form onSubmit={handleSignUpFormSubmit}>
        <div className="table">
          <div className="input">
            <label htmlFor="username">Username:</label>
            <input
              onChange={handleSignUpFormChange}
              value={signUpFormData.username}
              name="username"
              placeholder="username"
              className="textbar"
            ></input>
          </div>
          <div className="input">
            <label htmlFor="password">Password:</label>
            <input
              onChange={handleSignUpFormChange}
              value={signUpFormData.password}
              name="password"
              placeholder="password"
              type="password"
              className="textbar"
            ></input>
          </div>
        </div>
        <div className="button">
          <button type="submit">Create Account</button>
        </div>
      </form>
    </div>
  );
}
