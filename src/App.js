import "./assets/css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatFeature from "./components/Chat";
import HomePage from "./components/Home";
import JoinChat from "./components/JoinChat";
import SignUp from "./components/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chat" element={<JoinChat />} />
        <Route path="/chat/:roomId" element={<ChatFeature />} />
        <Route path="*" element={<h1>404 page not found'</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
