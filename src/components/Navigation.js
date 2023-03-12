import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useLocation} from "react-router-dom";

export default function Navigation({ socket, setCurrentUser, setUserObject, SetUserToken, currentUser, userObject}) {
  const disconnectSocket = () => {
    socket.disconnect();
  };

  useEffect(() => {
    console.log(currentUser)
    console.log(userObject)
  }, [currentUser, userObject])

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
  } else if (currentlocation.pathname === "/login") {
    return (
      <div className="Nav">
        <Link to="/">
          <img src="CATtention-logo.png" alt="logo" className="logo" />
        </Link>
        <div className="nav-btn">
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
        <div className="nav-btn">
          <Link to="/login" className="btn">
            Log In
          </Link>
        </div>
      </div>
    );
  } else if (currentlocation.pathname === "/joinchat") {
    return (
      <div className="Nav">
        <Link to="/">
          <img src="CATtention-logo.png" alt="logo" className="logo" />
        </Link>
        <div className="nav-btn">
          <Link to="/profile" className="btn">
            Profile
          </Link>
          <Link to="/login" className="btn"
          onClick={() => {
            localStorage.removeItem("token");
            setCurrentUser("");
            setUserObject({});
            SetUserToken("");
          }}>
            Log Out
          </Link>
        </div>
      </div>
    );
  } else if (currentlocation.pathname === "/chat") {
    return (
      <div className="Nav">
        <Link to="/">
          <img
            src="CATtention-logo.png"
            alt="logo"
            className="logo"
            onClick={disconnectSocket}
          />
        </Link>
        <div className="nav-btn">
          <Link to="/profile" className="btn">
            Profile
          </Link>
          <Link to="/logout" className="btn">
            Log Out
          </Link>
        </div>
      </div>
    );
  } else if (currentlocation.pathname === "/community") {
    return (
      <div className="Nav">
        <Link to="/">
          <img src="CATtention-logo.png" alt="logo" className="logo" />
        </Link>
        <div className="nav-btn">
          <Link to="/" className="btn">
            Home
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
