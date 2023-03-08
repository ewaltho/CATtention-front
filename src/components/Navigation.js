import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function Navigation() {
    const currentlocation = useLocation();
    if (currentlocation.pathname === "/") {
      return (
        <div className="Nav">
          <img src="CATtention-logo.png" alt="logo" className="logo" />
          <div className="nav-btn">
            <Link to="/login" className="btn">
              Log In
            </Link>
          </div>
        </div>
      );
    }
    else if (currentlocation.pathname === "/login") {
        return (
            <div className="Nav">
              <img src="CATtention-logo.png" alt="logo" className="logo" />
              <div className="nav-btn">
                <Link to="/signup" className="btn">
                  Register
                </Link>
              </div>
            </div>
          );
    }
    else if (currentlocation.pathname === "/signup") {
      return (
        <div className="Nav">
          <img src="CATtention-logo.png" alt="logo" className="logo" />
          <div className="nav-btn">
            <Link to="/login" className="btn">
              Log In
            </Link>
          </div>
        </div>
      );
    }
    else if (currentlocation.pathname === "/joinchat") {
      return (
        <div className="Nav">
          <img src="CATtention-logo.png" alt="logo" className="logo" />
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
    }
}
