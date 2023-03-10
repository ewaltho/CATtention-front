import React from "react";
import "../assets/css/Profile.css"

export default function Profile(props){
    return (
        <div>
            <div className="user">
                <p>{props.userObject.username}</p>
                <img src="user-cat.png" alt="a cute cat" className="user-cat"/>
                <p>Total Hours:</p>
            </div>
            <div className="info">
                <div className="badges">
                    <p>Your Badges</p>
                    <div className="badge-container">
                        <img src="rested.jpg" className="achievement"/>
                        <img src="game master.jpg" className="achievement"/>
                        <img src="cat collab.jpg" className="achievement"/>
                        <img src="high score.jpg" className="achievement"/>
                        <img src="scholarly.jpg" className="achievement"/>
                    </div>
                </div>
                <div className="settings">
                    <p>Settings</p>
                    <div className="theme">
                        <p>Theme:</p>
                        <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                        </label>
                    </div>
                    <div className="language">
                        <p>Language:</p>
                        <select className="lang-select">
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}