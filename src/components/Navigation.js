import React from "react";
import { Link } from "react-router-dom";
import { useLocation} from "react-router-dom";

export default function Navigation({ socket, setCurrentUser, setUserObject, setUserToken }) {
  const disconnectSocket = () => {
    socket.disconnect();
  };

  const currentlocation = useLocation();
  if (currentlocation.pathname === "/") {
    return (
      <div className="Nav">
        <Link to="/">
          <img src="CATtention-logo.png" alt="logo" className="logo" />
        </Link>
        <div className="nav-btn">
          <Link to="/login" className="btn">
            Log In
          </Link>
        </div>
      </div>
    );
  } else if (currentlocation.pathname === "/home") {
    return (
      <div className="Nav">
        <Link to="/home">
          <img src="CATtention-logo.png" alt="logo" className="logo" />
        </Link>
        <div className="nav-btn">
          <Link to="/profile" className="btn">
            Profile
          </Link>
          <Link to="/login" className="btn" onClick={() => {
            localStorage.removeItem("token")
            setCurrentUser("");
            setUserObject({});
            setUserToken("")
          }}>
            Log Out
          </Link>
        </div>
      </div>
    );
  } else if (currentlocation.pathname === "/login") {
    return (
      <div className="Nav">
        <Link to="/">
          <img src="CATtention-logo.png" alt="logo" className="logo" />
        </Link>
        <div className="nav-btn">
          <Link to="/" className="btn">
            Home
          </Link>
          <Link to="/signup" className="btn">
            Register
          </Link>
        </div>
      </div>
    );
  } else if (currentlocation.pathname === "/signup") {
    return (
      <div className="Nav">
        <Link to="/">
          <img src="CATtention-logo.png" alt="logo" className="logo" />
        </Link>
          <Link to="/" className="btn">
            Home
          </Link>
        <div className="nav-btn">
          <Link to="/login" className="btn">
            Log In
          </Link>
        </div>
      </div>
    );
  } else if (currentlocation.pathname === "/joinroom") {
    return (
      <div className="Nav">
        <Link to="/home">
          <img src="CATtention-logo.png" alt="logo" className="logo" />
        </Link>
        <div className="nav-btn">
          <Link to="/profile" className="btn">
            Profile
          </Link>
          <Link to="/login" className="btn" onClick={() => {
            localStorage.removeItem("token")
            setCurrentUser("");
            setUserObject({});
            setUserToken("")
          }}>
            Log Out
          </Link>
        </div>
      </div>
    );
  } else if (currentlocation.pathname === "/createroom") {
    return (
      <div className="Nav">
        <Link to="/home">
          <img src="CATtention-logo.png" alt="logo" className="logo" />
        </Link>
        <div className="nav-btn">
          <Link to="/profile" className="btn">
            Profile
          </Link>
          <Link to="/login" className="btn" onClick={() => {
            localStorage.removeItem("token")
            setCurrentUser("");
            setUserObject({});
            setUserToken("")
          }}>
            Log Out
          </Link>
        </div>
      </div>
    );
  } else if (currentlocation.pathname === "/chat") {
    return (
      <div className="Nav">
        <Link to="/home">
          <img
            src="CATtention-logo.png"
            alt="logo"
            className="logo"
            onClick={disconnectSocket}
          />
        </Link>
        <div className="nav-btn">
          <Link to="/home" className="btn"  onClick={disconnectSocket}>
            Leave Room
          </Link>
         
          <Link to="/profile" className="btn">
            Profile
          </Link>
          <Link to="/login" className="btn" onClick={() => {
            localStorage.removeItem("token")
            setCurrentUser("");
            setUserObject({});
            setUserToken("")
          }}>
            Log Out
          </Link>
        </div>
      </div>
    );
  } else if (currentlocation.pathname === "/community") {
    return (
      <div className="Nav">
        <Link to="/home">
          <img src="CATtention-logo.png" alt="logo" className="logo" />
        </Link>
        <div className="nav-btn">
          <Link to="/home" className="btn">
            Home
          </Link>
        </div>
      </div>
    );
  } else if (currentlocation.pathname === "/profile") {
    return (
      <div className="Nav">
        <Link to="/home">
          <img src="CATtention-logo.png" alt="logo" className="logo" />
        </Link>
        <div className="nav-btn">
          <Link to="/home" className="btn">
            Home
          </Link>
          <Link to="/login" className="btn" onClick={() => {
            localStorage.removeItem("token")
            setCurrentUser("");
            setUserObject({});
            setUserToken("")
          }}>
            Log Out
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Nav">
        <Link to="/">
          <img src="CATtention-logo.png" alt="logo" className="logo" />
        </Link>
        <div className="nav-btn">
          <Link to="/signup" className="btn">
            Register
          </Link>
          <Link to="/login" className="btn">
            Log In
          </Link>
        </div>
      </div>
    );
  }
}
