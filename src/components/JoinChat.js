import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/API';
// import io from "socket.io-client";

// const socket = io('http://localhost:3001');

function JoinChat(props) {
  const [roomCode, setRoomCode] = useState("");
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    props.socket.on("disconnect", () => {
      props.socket.connect();
    });
    redirectIfTokenOrNotRegistered(props.userToken);
    const roomCode = Math.random().toString(36).substring(2, 8);

    // eslint-disable-next-line
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

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleCreateRoom = async (event) => {
    event.preventDefault();
    if (roomName.trim() !== "") {
      // 6 random characters FOR ROOM CODE
      const roomCode = Math.random().toString(36).substring(2, 8);
      // Save the room details to the server
      const response = await API.createNewRoom({
        room_name: roomName,
        code: roomCode,
      });
      props.setRoomData(response.data);

      // Redirect the user to the chat room with the assigned ID and room code
      navigate(`/chat`);
    }
  };
  // validate room code and reroute if exists
  const handleJoinExistingRoom = async (event) => {
    event.preventDefault();
    if (roomCode.trim() !== "") {
      try {
        const response = await API.getOneRoom(roomCode);
        props.setRoomData(response.data);
        console.log(props.roomData);

        navigate(`/chat`);
      } catch (error) {
        alert("Room not found");
      }
    }
  };

  return (
    <div className="join-chat form">
      <h1>Join a Chat Room</h1>
      <hr />
      <form onSubmit={handleJoinExistingRoom} className="row room-form">
        <label htmlFor="room-id">Room Code:</label>
        <input
          type="text"
          id="room-code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          className="textbar"
        />
        <button type="submit">Join Room</button>
      </form>
    </div>
  );
}

export default JoinChat;
