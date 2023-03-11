import React from "react";
import Timer from "./Timer";
import Chat from "./Chat";
import "../assets/css/Room.css";
import io from "socket.io-client";
// Dev URL
// const socket = io("http://localhost:3001");
// Production Build
const socket = io("https://cattention-api.herokuapp.com");

export default function Room(props) {
  return (
    <>
      <div className="room">
        <div className="timer">
          <h1 className="room-code">Room Code: {props.roomData.code}</h1>
          <Timer
            roomData={props.roomData}
            roomPreferences={props.roomPreferences}
            userObject={props.userObject}
            socket={socket}
          />
        </div>
        <div className="chatbox">
          <Chat
            roomData={props.roomData}
            userObject={props.userObject}
            currentUser={props.currentUser}
            roomPreferences={props.roomPreferences}
            socket={socket}
          />
        </div>
      </div>
    </>
  );
}
