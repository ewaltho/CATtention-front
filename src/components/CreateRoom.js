import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/CreateRoom.css";
import API from "../utils/API";

export default function CreateRoom({
  roomPreferences,
  setRoomPreferences,
  roomData,
  setRoomData,
}) {
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

  const navigate = useNavigate();
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

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    if (roomPreferences.roomName.trim() !== "") {
      // 6 random characters FOR ROOM CODE
      const roomCode = Math.random().toString(36).substring(2, 8);
      // Save the room details to the server
      const response = await API.createNewRoom({
        room_name: roomPreferences.roomName,
        code: roomCode,
      });
      setRoomData(response.data);

      // Redirect the user to the chat room with the assigned ID and room code
      navigate(`/chat`);
    }
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
