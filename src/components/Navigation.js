import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function Navigation() {
    const currentlocation = useLocation();
    console.log(currentlocation)
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
              <Link to="/" className="btn">
                Home
              </Link>
            </div>
          );
    }
}
