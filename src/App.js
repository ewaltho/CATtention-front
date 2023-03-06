import "./assets/css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
// import API from "./utils/API";
import ChatFeature from "./components/Chat";
import HomePage from "./components/Home";
import JoinChat from "./components/JoinChat";
import SignUp from "./components/SignUp";

function App() {
  const [signUpFormData, setSignUpFormData] = useState({});

  const handleSignUpFormChange = (e) => {
    e.preventDefault();
    setSignUpFormData({
      ...signUpFormData,
      [e.target.name]: e.target.value,
    });
  };

  const clearSignupForm = () => {
    setSignUpFormData({
      username: "",
      password: "",
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={
            <SignUp
              handleSignUpFormChange={handleSignUpFormChange}
              signUpFormData={signUpFormData}
              clearSignupForm={clearSignupForm}
            />
          }
        />
        <Route path="/chat" element={<JoinChat />} />
        <Route path="/chat/:roomId" element={<ChatFeature />} />
        <Route path="*" element={<h1>404 page not found'</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
