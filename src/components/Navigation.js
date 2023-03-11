import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// if statement checks current path with useLocation and generates navbar accordingly
export default function Navigation() {
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
          <Link to="/" className="btn">
            Log Out
          </Link>
        </div>
      </div>
    );
  } else if (currentlocation.pathname === "/chat") {
    return (
      <div className="Nav">
        <Link to="/">
          <img src="CATtention-logo.png" alt="logo" className="logo" />
        </Link>
        <div className="nav-btn">
          <Link to="/profile" className="btn">
            Profile
          </Link>
          <Link to="/" className="btn">
            Log Out
          </Link>
        </div>
      </div>
    );
  } else if (currentlocation.pathname ==="/community") {
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
