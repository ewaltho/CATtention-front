import React from "react";
import {Link} from 'react-router-dom'
import Navigation from "./Navigation";

function HomePage() {
    return (
        <div className="home">
            <Navigation />
            <p className="bio">Welcome to CATtention! The ADHD friendly productivity app. Work alone or with a friend. You can level up with minigames and earn cat badges to customize your profile! Now go! Be productive!</p>
            <div className="register-btn">
                <Link to="/signup" className="register-btn">Register</Link>
            </div>
            <div className="tips">
                <Link to="/" className="tips">From the community</Link>
            </div>
        </div>
    );
}

export default HomePage;