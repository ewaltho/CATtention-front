import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import io from "socket.io-client";

const socket = io('http://localhost:3001');

function JoinChat() {
  const [roomId, setRoomId] = useState("");
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
      const roomId = response.data.id;
      // Redirect the user to the chat room with the assigned ID
      navigate(`/chat/${roomId}`);
    }
  }; 

  const handleJoinExistingRoom = (event) => {
    event.preventDefault();
    if (roomId.trim() !== "") {
      // Check if the room exists on the server
      socket.emit("joinRoom", { roomId }, (response) => {
        if (response.success) {
          // Redirect the user to the chat room
          // history.push(/chat/${roomId});
        } else {
          // Display an error message if the room does not exist
          alert(response.message);
        }
      });
    }
  };

  return (
    <div className="join-chat">
      <h1>Join a Chat Room</h1>
      <form onSubmit={handleCreateRoom}>
        <label htmlFor="room-name">Room Name:</label>
        <input type="text" id="room-name" value={roomName} onChange={handleRoomNameChange} />
        <button type="submit">Create Room</button>
      </form>
      <hr />
      <form onSubmit={handleJoinExistingRoom}>
        <label htmlFor="room-id">Room Code:</label>
        <input type="text" id="room-id" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
        <button type="submit">Join Room</button>
      </form>
    </div>
  );
}

export default JoinChat;