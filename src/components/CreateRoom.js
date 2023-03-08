import React, { useState } from "react";
import "../assets/css/CreateRoom.css";

export default function CreateRoom(props) {
  const [roomPreferences, setRoomPreferences] = useState({});
  //   room prefs need the following keys: minigames bool, workTime, breakTime, room name needs to create a room with socket.

  const handleRoomPrefsInputChange = (e) => {};

  return (
    <div>
      <label class="switch">
        <input type="checkbox"></input>
        <span class="slider"></span>
      </label>
    </div>
  );
}
