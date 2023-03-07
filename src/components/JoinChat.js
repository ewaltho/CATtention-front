import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
// import io from "socket.io-client";

// const socket = io('http://localhost:3001');

function JoinChat(props) {
  const [roomCode, setRoomCode] = useState("");
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate(); 

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleCreateRoom = async (event) => {
    event.preventDefault();
    if (roomName.trim() !== "") {
      // 6 random characters FOR ROOM CODE 
      const roomCode = Math.random().toString(36).substring(2, 8);
      // Save the room details to the server
      const response = await axios.post("http://localhost:3001/api/rooms", { room_name: roomName, code: roomCode });
      props.setRoomData(response.data);
      const roomId = response.data.id;
      // Redirect the user to the chat room with the assigned ID and room code
      navigate(`/chat/${roomId}?code=${roomCode}`);
    }
  };

  const handleJoinExistingRoom = async (event) => {
    event.preventDefault();
    if (roomCode.trim() !== "") {
      try {
        const response = await axios.get(`http://localhost:3001/api/rooms/${roomCode}`);
        props.setRoomData(response.data);
        console.log(props.roomData)
        const roomId = response.data.id;
        navigate(`/chat/${roomId}?code=${roomId}`);
      } catch (error) {
        alert("Room not found");
      }
    }
  };

  return (
    <div className="join-chat form">
      <h1>Join a Chat Room</h1>
      <form onSubmit={handleCreateRoom}>
        <label htmlFor="room-name">Room Name:</label>
        <input type="text" id="room-name" value={roomName} onChange={handleRoomNameChange} />
        <button type="submit">Create Room</button>
      </form>
      <hr />
      <form onSubmit={handleJoinExistingRoom}>
        <label htmlFor="room-id">Room Code:</label>
        <input type="text" id="room-code" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} />
        <button type="submit">Join Room</button>
      </form>
    </div>
  );
}

export default JoinChat;