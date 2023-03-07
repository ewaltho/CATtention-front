import React from "react";
import Chat from "./Chat";

export default function Room(props) {
  // todo: create a state variable once we have Timer component and Game component working, so that we can conditionally render these in a div that positions them on the left side of the page.
  return (
    <>
      <div className="room">
        <div>
          <p>Placeholder text for timer/minigame</p>
        </div>
        <Chat roomData={props.roomData} />
      </div>
    </>
  );
}
