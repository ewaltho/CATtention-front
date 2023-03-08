import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home">
      <p className="bio">
        Welcome to CATtention! The ADHD friendly productivity app. Work alone or
        with a friend. You can level up with mini-games and earn cat badges to
        customize your profile! Now go! Be productive!
      </p>
        <Link to="/signup" className="register-btn">
          Register
        </Link>
        <Link to="/" className="tipsBtn">
          From the community
        </Link>
    </div>
  );
}

export default HomePage;
