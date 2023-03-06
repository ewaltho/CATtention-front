import "./assets/css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
// import API from "./utils/API";
import Chat from "./components/Chat";
import HomePage from "./components/Home";
import JoinChat from "./components/JoinChat";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  const [signUpFormData, setSignUpFormData] = useState({});
  const [roomData, setRoomData] = useState({});
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
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<JoinChat roomData={roomData} setRoomData={setRoomData} />} />
        <Route path="/chat/:roomId" element={<Chat roomData={roomData} />} />
        <Route path="*" element={<h1>404 page not found'</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
