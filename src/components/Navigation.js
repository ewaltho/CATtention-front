import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

// TODO: Change class names to format individual navbars or change main CSS to accomodate different styles
export default function Navigation() {
    const currentlocation = useLocation();
    if (currentlocation.pathname === "/") {
        return (
          <div className="Nav">
            <img src="CATtention-logo.png" alt="logo" className="logo" />
            <Link to="/login" className="btn">
              Login
            </Link>
          </div>
        );
    }
    else if (currentlocation.pathname === "/login") {
        return (
            <div className="Nav">
              <img src="CATtention-logo.png" alt="logo" className="logo" />
              <Link to="/signup" className="btn">
                Register
              </Link>
            </div>
          );
    }
    else if (currentlocation.pathname === "/signup") {
        return (
            <div className="Nav">
              <img src="CATtention-logo.png" alt="logo" className="logo" />
              <Link to="/login" className="btn">
                Login
              </Link>
            </div>
          );
    }
    else if (currentlocation.pathname === "/joinchat") {
        return (
            <div className="Nav">
              <img src="CATtention-logo.png" alt="logo" className="logo" />
              <Link to="" className="btn">
                Profile
              </Link>
              <Link to="" className="btn">
                Log Out
              </Link>
            </div>
          );
    }
}
