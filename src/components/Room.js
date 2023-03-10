import React from "react";
import Timer from "./Timer";
import Chat from "./Chat";
import "../assets/css/Room.css";

// todo: create a state variable once we have Timer component and Game component working, so that we can conditionally render these in a div that positions them on the left side of the page.
export default function Room(props) {
  console.log(props);
  return (
    <>
      <div className="room">
        <div className="timer">
          <h1 className="room-code">Room Code: {props.roomData.code}</h1>
          <Timer
            roomPreferences={props.roomPreferences}
            userObject={props.userObject}
          />
        </div>
        <div className="chatbox">
          <Chat
            roomData={props.roomData}
            userObject={props.userObject}
            currentUser={props.currentUser}
            roomPreferences={props.roomPreferences}
          />
        </div>
      </div>
    </>
  );
}
