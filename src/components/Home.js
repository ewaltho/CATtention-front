import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import API from '../utils/API';

function HomePage(props) {
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      API.isValidToken(storedToken).then((tokenData) => {
        if (tokenData) {
          console.log(tokenData.data.user);
  
          props.setCurrentUser(tokenData.data.user.username);
       
        }
      });
    } else {
      console.log("no token");
    }
  }, []);

  const currentlocation = useLocation();

  if (currentlocation.pathname === "/") {
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
        {/* <div className="bottom-btn">
          <Link to="/createroom" className="register-btn">
            Create a Room
          </Link>
          <Link to="/joinchat" className="register-btn">
            Join a Room
          </Link>
        </div> */}
        <div className="bottom-box">
          <img
            src="wave-cat-black.png"
            alt="drawing of cat waving"
            className="cat-left cat"
          />
          <Link to="/community" className="tipsBtn">
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
  } else {
    return (
      <div className="home">
        <p className="bio">
          Welcome to CATtention! The ADHD friendly productivity app. Work alone or
          with a friend. You can level up with mini-games and earn cat badges to
          customize your profile! Now go! Be productive!
        </p>
        <div className="bottom-btn">
          <Link to="/createroom" className="register-btn">
            Create a Room
          </Link>
          <Link to="/joinchat" className="register-btn">
            Join a Room
          </Link>
        </div>
        <div className="bottom-box">
          <img
            src="wave-cat-black.png"
            alt="drawing of cat waving"
            className="cat-left cat"
          />
          <Link to="/community" className="tipsBtn">
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
}

export default HomePage;
