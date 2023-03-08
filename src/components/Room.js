import React from "react";
import Chat from "./Chat";

export default function Room(props) {
  return (
    <>
      <div className="room">
        <div>
          <p>Placeholder text for timer/minigame</p>
        </div>
        <Chat roomData={props.roomData} userObject={props.userObject} />
      </div>
    </>
  );
}
