import React, { useEffect } from "react";
import Timer from "./Timer";
import Chat from "./Chat";
import "../assets/css/Room.css";

export default function Room(props) {
  return (
    <>
      <div className="room">
        <div className="timer">
          <h1 className="room-code">Room Code: {props.roomData.code}</h1>
          <Timer
            joinExistingRoom={props.joinExistingRoom}
            setJoinExistingRoom={props.setJoinExistingRoom}
            roomData={props.roomData}
            roomPreferences={props.roomPreferences}
            userObject={props.userObject}
            socket={props.socket}
          />
        </div>
        <div className="chatbox">
          <Chat
            roomData={props.roomData}
            userObject={props.userObject}
            currentUser={props.currentUser}
            roomPreferences={props.roomPreferences}
            socket={props.socket}
          />
        </div>
      </div>
    </>
  );
}
