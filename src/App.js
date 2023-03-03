import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import ChatFeature from "./Chat";
import HomePage from "./Home";

function App() {
  return (
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/chat" element={<ChatFeature/>}/>
        <Route path="*" element={<h1>404 page not found'</h1>}/>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
