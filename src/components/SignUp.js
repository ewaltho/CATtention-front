import React from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/API";

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
    console.log(response);
    if (response.status === 200) {
      clearSignupForm();
      setUserToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      // This will redirect. the redirect method in react router dom is deprecated, this is what we use now.
      return navigate("/joinchat");
    } else {
      clearSignupForm();
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUpFormSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          onChange={handleSignUpFormChange}
          value={signUpFormData.username}
          name="username"
          placeholder="username"
        ></input>
        <label htmlFor="password">Password:</label>
        <input
          onChange={handleSignUpFormChange}
          value={signUpFormData.password}
          name="password"
          placeholder="password"
          type="password"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
