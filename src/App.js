import "./assets/css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "./utils/API";
import CreateRoom from "./components/CreateRoom";
import Room from "./components/Room";
import HomePage from "./components/Home";
import JoinChat from "./components/JoinChat";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Navigation from "./components/Navigation";

function App() {
  // eslint-disable-next-line
  const [userToken, setUserToken] = useState("");
  const [userObject, setUserObject] = useState({});
  const [roomData, setRoomData] = useState("");
  const [signUpFormData, setSignUpFormData] = useState({
    username: "",
    password: "",
  });
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  // State for room preferences needs to live here to be accessed in profile and other locations.

  const [roomPreferences, setRoomPreferences] = useState({
    minigameToggle: false,
  });

  // triggers on page load so userObject is set to the data within token data. This includes user ID, and username.
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      API.isValidToken(storedToken).then((tokenData) => {
        if (tokenData) {
          console.log(tokenData.data.user);
          setUserObject(tokenData.data.user);
        }
      });
    } else {
      console.log("no token");
    }
  }, []);

  const handleSignUpFormChange = (e) => {
    e.preventDefault();
    setSignUpFormData({
      ...signUpFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginFormChange = (e) => {
    e.preventDefault();
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  const clearSignupForm = () => {
    setSignUpFormData({
      username: "",
      password: "",
    });
  };

  const clearLoginForm = () => {
    setLoginFormData({
      username: "",
      password: "",
    });
  };

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={
            <SignUp
              handleSignUpFormChange={handleSignUpFormChange}
              signUpFormData={signUpFormData}
              clearSignupForm={clearSignupForm}
              setUserToken={setUserToken}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              handleLoginFormChange={handleLoginFormChange}
              loginFormData={loginFormData}
              clearLoginForm={clearLoginForm}
              setUserToken={setUserToken}
            />
          }
        />
        <Route
          path="/joinchat"
          element={<JoinChat roomData={roomData} setRoomData={setRoomData} />}
        />
        <Route
          path="/createroom"
          element={
            <CreateRoom
              roomPreferences={roomPreferences}
              setRoomPreferences={setRoomPreferences}
            />
          }
        />
        <Route
          path="/chat"
          element={<Room roomData={roomData} userObject={userObject} />}
        />
        <Route path="*" element={<h1>404 page not found'</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
