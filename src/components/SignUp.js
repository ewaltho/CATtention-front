import React from "react";

export default function SignUp({
  handleSignUpFormChange,
  handleSignUpFormSubmit,
}) {
  return (
    <form onSubmit={handleSignUpFormSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        onChange={handleSignUpFormChange}
        name="username"
        placeholder="username"
      ></input>
      <label htmlFor="password">Password:</label>
      <input
        onChange={handleSignUpFormChange}
        name="password"
        placeholder="password"
        type="password"
      ></input>
      <button type="submit">Submit</button>
    </form>
  );
}
