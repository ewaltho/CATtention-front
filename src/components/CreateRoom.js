import React, { useEffect } from "react";
import "../assets/css/CreateRoom.css";

export default function CreateRoom({ roomPreferences, setRoomPreferences }) {
  //   room prefs need the following keys: minigames bool, workTime, breakTime, room name needs to create a room with socket.

  // ! On page load, if there are previous prefs, this will automatically fill them into our state.
  useEffect(() => {
    const savedRoomPrefObj = JSON.parse(localStorage.getItem("roomPrefs"));
    console.log(savedRoomPrefObj);
    if (savedRoomPrefObj) {
      setRoomPreferences(savedRoomPrefObj);
    }
    // eslint-disable-next-line
  }, []);

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

  const clearAllPreferences = (e) => {
    e.preventDefault();
    localStorage.removeItem("roomPrefs");
    setRoomPreferences({
      roomName: "",
      breakTime: "",
      workTime: "",
      minigameToggle: false,
    });
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    localStorage.setItem("roomPrefs", JSON.stringify(roomPreferences));
  };

  return (
    <>
      <form onSubmit={handleFormSubmission}>
        <label htmlFor="workTime">Work Timer:</label>
        <input
          name="workTime"
          placeholder="Minutes to work"
          onChange={handleRoomPrefsInputChange}
          value={roomPreferences.workTime}
        ></input>
        <label htmlFor="workTime">Break Timer:</label>
        <input
          name="breakTime"
          placeholder="Minutes to break"
          onChange={handleRoomPrefsInputChange}
          value={roomPreferences.breakTime}
        ></input>
        {/* ! This needs to be made to create a room. I will speak with alex about how to do this later this evening. */}
        <label htmlFor="workTime">Room Name:</label>
        <input
          name="roomName"
          placeholder="Room Name"
          onChange={handleRoomPrefsInputChange}
          value={roomPreferences.roomName}
        ></input>
        <label htmlFor="minigameToggle">Minigame Toggle:</label>
        <label className="switch">
          <input
            type="checkbox"
            name="minigameToggle"
            onChange={handleRoomPrefsInputChange}
          ></input>
          <span className="slider"></span>
        </label>
        <button type="submit">Create Room</button>
      </form>

      <button type="button" onClick={clearAllPreferences}>
        Clear Preferences
      </button>
    </>
  );
}
