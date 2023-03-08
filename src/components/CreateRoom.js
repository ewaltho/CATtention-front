import React, { useState } from "react";
import "../assets/css/CreateRoom.css";

export default function CreateRoom(props) {
  const [roomPreferences, setRoomPreferences] = useState({
    minigameToggle: false,
  });
  //   room prefs need the following keys: minigames bool, workTime, breakTime, room name needs to create a room with socket.

  const handleRoomPrefsInputChange = (e) => {
    // e.preventDefault();
    if (
      e.target.name === "minigameToggle" &&
      roomPreferences.minigameToggle === false
    ) {
      setRoomPreferences({
        ...roomPreferences,
        minigameToggle: true,
      });
    } else if (
      e.target.name === "minigameToggle" &&
      roomPreferences.minigameToggle === true
    ) {
      setRoomPreferences({
        ...roomPreferences,
        minigameToggle: false,
      });
    } else {
      setRoomPreferences({
        ...roomPreferences,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <form>
      <label htmlFor="workTime">Work Timer:</label>
      <input
        name="workTime"
        placeholder="Minutes to work"
        onChange={handleRoomPrefsInputChange}
      ></input>
      <label className="switch">
        <input
          type="checkbox"
          name="minigameToggle"
          onChange={handleRoomPrefsInputChange}
        ></input>
        <span className="slider"></span>
      </label>
    </form>
  );
}
