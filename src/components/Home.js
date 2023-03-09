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
      <Link to="/createroom" className="register-btn">
        Create A Room
      </Link>
      <Link to="/joinchat" className="register-btn">
        Join A Room
      </Link>
      <div className="bottom-box">
        <img
          src="wave-cat-black.png"
          alt="drawing of cat waving"
          className="cat-left cat"
        />
        <Link to="/" className="tipsBtn">
          From the community
        </Link>
        <img
          src="stretch-cat-black.png"
          alt="drawing of cat stretching"
          className="cat-right cat"
        />
      </div>
    </div>
  );
}

export default HomePage;
