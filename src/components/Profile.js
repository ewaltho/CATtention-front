import React, { useEffect, useState } from "react";
import "../assets/css/Profile.css";
import API from "../utils/API";

export default function Profile(props) {
  const [usersAvailCats, setUsersAvailCats] = useState([]);
  const [userWorkTime, setUserWorkTime] = useState("");

  // return and set data if valid token (logged in user) is available
  useEffect(() => {
    API.isValidToken(localStorage.getItem("token")).then((res) => {
      if (res.data.isValid) {
        props.setUserObject(res.data.user);
        checkForAvailableCats(res.data.user.id);
        API.getOneUser(res.data.user.id).then((res) => {
          if (res.status !== 404) {
            props.setProfileBadge(res.data.profile_badge);
          }
        });
      }
    });
  }, []);

  // check for achievements and then map over arr returned to show on page.
  const checkForAvailableCats = async (userId) => {
    const user = await API.getOneUser(userId);
    setUserWorkTime(user.data.work_time);
    const findAllCats = await API.allCats();
    let foundUsersWorkTime = user.data.work_time;
    let catArr = findAllCats.data;

    let availableCats = catArr.filter((catObj) => {
      if (foundUsersWorkTime >= catObj.min_work_time) {
        return true;
      } else {
        return false;
      }
    });
    setUsersAvailCats(availableCats);
  };

  const changeProfileBadge = (e) => {
    props.setProfileBadge(e.target.src);
    API.updateUser({ profile_badge: e.target.src }, props.userObject.id);
  };

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div>
      <div className="user">
        <div className="profile-username">
          <p>{props.userObject.username}</p>
          <img src={props.profileBadge} alt="a cute cat" className="user-cat" />
        </div>
        <div className="userStats">
          <p>Total Minutes: {userWorkTime}</p>
        </div>
      </div>
      <div className="info">
        <div className="badges">
          <p>Your Badges</p>
          <div className="badge-container">
            {usersAvailCats.map((catObj, i) => {
              return (
                <img
                  onClick={changeProfileBadge}
                  src={catObj.img_src}
                  alt="cat achievement"
                  key={i}
                  className="achievement"
                ></img>
              );
            })}
          </div>
        </div>
        <div className="settings">
          <p>Settings</p>
          <div className="theme">
            <p>Theme:</p>
            <label className="switch">
              <input
                type="checkbox"
                onClick={() => {
                  if (theme === "light") {
                    setTheme("dark");
                  } else {
                    setTheme("light");
                  }
                }}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
