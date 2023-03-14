import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../assets/css/CreateRoom.css';
import API from '../utils/API';

export default function CreateRoom({
  socket,
  roomPreferences,
  setRoomPreferences,
  roomData,
  setRoomData,
  userObject,
  userToken,
}) {
  const navigate = useNavigate();
 

  // ! Removed saved room object. This was causing bugs with joining a room.
  // 6 random characters FOR ROOM CODE
  // ! generates a room code on page load, this way, we can persist this data in local storage.
  useEffect(() => {
    socket.on("disconnect", () => {
      socket.connect();
    });
    redirectIfTokenOrNotRegistered(userToken);
    const roomCode = Math.random().toString(36).substring(2, 8);
    setRoomPreferences({
      roomName: "",
      breakTime: "",
      workTime: "",
      minigameToggle: false,
      roomCode: roomCode,
    });


  }, []);

  const redirectIfTokenOrNotRegistered = async (token) => {
    if (localStorage.getItem("token")) {
      try {
        const verifyToken = await API.isValidToken(
          localStorage.getItem("token")
        );

        if (verifyToken) {
          console.log("valid token");
          return;
        }
      } catch (err) {
        if (err.response.data.isValid === false) {
          navigate("/login");
        } else {
          navigate("/signup");
        }
      }
    } else {
      try {
        const verifyToken = await API.isValidToken(token);

        if (verifyToken) {
          console.log("valid token");
          return;
        }
      } catch (err) {
        if (err.response.data.isValid === false) {
          navigate("/login");
        } else {
          navigate("/signup");
        }
      }
    }
  };

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
    } else if (e.target.name === "roomName") {
      setRoomPreferences({
        ...roomPreferences,
        [e.target.name]: e.target.value,
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
    setRoomPreferences({
      roomName: "",
      breakTime: "",
      workTime: "",
      minigameToggle: false,
    });
  };

  let roomFilterResult;
  const checkIfRoomExists = async (roomName) => {
    const rooms = await API.getAllRooms();
    const roomArr = rooms.data;
    if (
      roomArr.filter((room) => {
        if (room.room_name === roomName) {
          return true;
        } else {
          return false;
        }
      }).length >= 1
    ) {
      return (roomFilterResult = true);
    } else {
      return (roomFilterResult = false);
    }
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    await checkIfRoomExists(roomPreferences.roomName);
    if (roomFilterResult) {
      return console.log("room exists");
    }
    if (roomPreferences.roomName.trim() !== "") {
      try {
        // Save the room details to the server
        const response = await API.createNewRoom({
          room_name: roomPreferences.roomName,
          code: roomPreferences.roomCode,
          UserId: userObject.id
        });

        setRoomData(response.data);
        // Redirect the user to the chat room with the assigned ID and room code
        navigate(`/chat`);
      } catch (error) {
        console.error("Error creating new room: ", error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmission} className="room-form">
        <div className="column">
          <div className="row">
            <label htmlFor="workTime">Work Timer:</label>
            <input
              name="workTime"
              type="number"
              placeholder="Minutes to work"
              onChange={handleRoomPrefsInputChange}
              value={roomPreferences.workTime}
            ></input>
          </div>
          <div className="row">
            <label htmlFor="workTime">Room Name:</label>
            <input
              name="roomName"
              placeholder="Room Name"
              onChange={handleRoomPrefsInputChange}
              value={roomPreferences.roomName}
            ></input>
          </div>
        </div>

        <div className="column">
          <div className="row">
            <label htmlFor="workTime">Break Timer:</label>
            <input
              name="breakTime"
              type="number"
              placeholder="Minutes to break"
              onChange={handleRoomPrefsInputChange}
              value={roomPreferences.breakTime}
            ></input>
          </div>
          <div className="row">
            <label htmlFor="minigameToggle">Minigame Toggle:</label>
            <label className="switch">
              <input
                type="checkbox"
                name="minigameToggle"
                onChange={handleRoomPrefsInputChange}
              ></input>
              <span className="slider"></span>
            </label>
          </div>
        </div>
        <div className="btnColumn">
          <div className="btnRow">
            <button type="submit">Create Room</button>
          </div>
          <div className="btnRow">
            <button type="button" onClick={clearAllPreferences}>
              Clear Preferences
            </button>
          </div>
        </div>
      </form>
      <Link to="/joinroom" className="btn join-link">
        Join A Room Instead
      </Link>
    </>
  );
}
